/* Build 342 backup safety hotfix.
   Keeps pinned manual backups from being deleted by cloud pruning. */
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
  setTimeout(patchCloudPrune,1000);
})();
