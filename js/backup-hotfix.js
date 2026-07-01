/* Build 344 backup + list-state safety hotfix.
   Keeps pinned manual backups from being deleted by cloud pruning and makes
   trip-specific lists visible again after sign-in/cloud rehydrate. */
(function(){
  if(window.__DTP_BACKUP_HOTFIX__)return;
  window.__DTP_BACKUP_HOTFIX__=true;

  function canMirrorBackup(){
    return !!(window.CLOUD&&CLOUD.enabled&&CLOUD.user&&CLOUD.saveBackup);
  }

  function mirrorBackupPinToCloud(b){
    try{
      if(b&&b.id&&canMirrorBackup())CLOUD.saveBackup(b.id,b);
    }catch(e){}
  }

  function pinnedLocalBackupIds(){
    var ids=[];
    try{
      if(typeof loadBackups==='function'){
        loadBackups().forEach(function(b){
          if(b&&b.pinned&&b.id&&ids.indexOf(b.id)<0)ids.push(b.id);
        });
      }
    }catch(e){}
    return ids;
  }

  function patchCloudPrune(){
    try{
      if(!(window.CLOUD&&CLOUD.pruneBackups)||CLOUD._pruneBackupsPinnedSafe)return;
      CLOUD._pruneBackupsPinnedSafe=CLOUD.pruneBackups;
      CLOUD.pruneBackups=function(keepIds){
        var keep=(keepIds||[]).slice();
        pinnedLocalBackupIds().forEach(function(id){if(keep.indexOf(id)<0)keep.push(id);});
        if(CLOUD.listBackups){
          return CLOUD.listBackups().then(function(all){
            (all||[]).forEach(function(b){
              if(b&&b.pinned&&b.id&&keep.indexOf(b.id)<0)keep.push(b.id);
            });
            return CLOUD._pruneBackupsPinnedSafe(keep);
          },function(){
            return CLOUD._pruneBackupsPinnedSafe(keep);
          });
        }
        return CLOUD._pruneBackupsPinnedSafe(keep);
      };
    }catch(e){}
  }

  function listStateSig(){
    try{return [S&&S.tripId,S&&S.persona,S&&S.plan,S&&S.fmode].join('|');}
    catch(e){return '';}
  }
  var lastListStateSig='';

  function normalizeListState(opts){
    opts=opts||{};
    try{
      if(!window.S)return;
      if(!S.plan||['packing','todo','needbuy','wishlist'].indexOf(S.plan)<0)S.plan='packing';
      S.fmode='all';
      if(S.filter&&S.filter.clear)S.filter.clear();
      if(typeof ensureActiveParty==='function')ensureActiveParty();
      if(typeof ensureVisibleTrip==='function')ensureVisibleTrip();
      if(typeof loadLists==='function')loadLists();
      lastListStateSig=listStateSig();
      if(opts.render!==false&&typeof render==='function')render();
    }catch(e){}
  }

  function scheduleNormalizeListState(){
    setTimeout(function(){normalizeListState();},0);
    setTimeout(function(){normalizeListState();},250);
    setTimeout(function(){normalizeListState();},1500);
  }

  function restoreSignedInPersonaAndLists(){
    try{
      if(!(window.CLOUD&&CLOUD.user&&window.S&&window.FAMILY))return;
      var uid=CLOUD.user.uid,match=null;
      for(var i=0;i<FAMILY.length;i++){
        if(FAMILY[i]&&FAMILY[i].uid===uid){match=FAMILY[i];break;}
      }
      if(match){
        S.persona=match.id;
        try{localStorage.setItem('dtp_persona',JSON.stringify(match.id));}catch(e){}
        S._seated=true;
      }
      normalizeListState();
    }catch(e){}
  }

  function scheduleRestoreSignedInPersonaAndLists(){
    setTimeout(restoreSignedInPersonaAndLists,0);
    setTimeout(restoreSignedInPersonaAndLists,300);
    setTimeout(restoreSignedInPersonaAndLists,1500);
  }

  function patchListState(){
    try{
      if(typeof rehydrate==='function'&&!window.__DTP_REHYDRATE_LIST_PATCHED__){
        window.__DTP_REHYDRATE_LIST_PATCHED__=true;
        var oldRehydrate=rehydrate;
        window.rehydrate=function(){
          var r=oldRehydrate.apply(this,arguments);
          scheduleNormalizeListState();
          return r;
        };
      }
      if(typeof onCloudSynced==='function'&&!window.__DTP_CLOUD_SYNC_LIST_PATCHED__){
        window.__DTP_CLOUD_SYNC_LIST_PATCHED__=true;
        var oldOnCloudSynced=onCloudSynced;
        window.onCloudSynced=function(){
          var r=oldOnCloudSynced.apply(this,arguments);
          scheduleRestoreSignedInPersonaAndLists();
          scheduleNormalizeListState();
          return r;
        };
      }
      if(typeof renderListsHub==='function'&&!window.__DTP_LIST_HUB_PATCHED__){
        window.__DTP_LIST_HUB_PATCHED__=true;
        var oldRenderListsHub=renderListsHub;
        window.renderListsHub=function(){
          if(listStateSig()!==lastListStateSig)normalizeListState({render:false});
          return oldRenderListsHub.apply(this,arguments);
        };
      }
    }catch(e){}
  }

  if(typeof toggleBackupPin==='function'){
    window.toggleBackupPin=function(idx){
      var list=loadBackups();if(!list[idx])return;
      list[idx].pinned=!list[idx].pinned;
      saveBackups(list);
      mirrorBackupPinToCloud(list[idx]);
      toast(list[idx].pinned?'Pinned - kept until you unpin it':'Unpinned');
      if(typeof renderScreen_inplace2==='function')renderScreen_inplace2();
    };
  }

  if(typeof archiveMirror==='function'){
    window.archiveMirror=function(list){
      if(!(window.CLOUD&&window.CLOUD.enabled&&window.CLOUD.user&&window.CLOUD.saveBackup))return;
      if(!list||!list.length)return;
      var newest=list[list.length-1],mk=null;
      try{mk=localStorage.getItem(ARCHIVE_MIRROR_KEY);}catch(e){}
      if(mk===newest.id)return;
      var keepIds=list.map(function(x){return x.id;});
      pinnedLocalBackupIds().forEach(function(id){if(keepIds.indexOf(id)<0)keepIds.push(id);});
      window.CLOUD.saveBackup(newest.id,newest).then(function(ok){
        if(ok){try{localStorage.setItem(ARCHIVE_MIRROR_KEY,newest.id);}catch(e){}
          if(window.CLOUD.pruneBackups)window.CLOUD.pruneBackups(keepIds);}
      });
    };
  }

  patchCloudPrune();
  patchListState();
  scheduleNormalizeListState();
  setTimeout(patchCloudPrune,1000);
  setTimeout(patchListState,1000);
})();
