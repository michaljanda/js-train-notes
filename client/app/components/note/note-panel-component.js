class NotePanel {

  constructor($state, modalService, notesService) {
    this.$state = $state;
    this.modalService = modalService;
    this.notesService = notesService;
  }

  goToDetail() {
    this.$state.go('notes.detail', { id: this.note.id });
  }

  remove() {
    this.modalService.confirm({msg: `Do you really want to remove note ${this.note.label} ?`}).then(() => {
      this.onRemove({id: this.note.id}); //quite magic
    });
  }
}

let notesApp = angular.module('notes');

notesApp.controller('NotePanelCtrl', NotePanel);
notesApp.component('notePanel', {
  bindings: {
    note: '<',
    onRemove: '&'
  },
  templateUrl: 'app/components/note/note-panel-component.html',
  controller: 'NotePanelCtrl'
});