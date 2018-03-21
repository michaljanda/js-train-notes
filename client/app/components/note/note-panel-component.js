class NotePanel {

  constructor($state) {
    this.$state = $state;
  }

  goToDetail() {
    this.$state.go('notes.detail', { id: this.note.id });
  }
}

let notesApp = angular.module('notes');

notesApp.controller('NotePanelCtrl', NotePanel);
notesApp.component('notePanel', {
  bindings: {
    note: '<'
  },
  templateUrl: 'app/components/note/note-panel-component.html',
  controller: 'NotePanelCtrl'
});