class NotePanel {

  constructor($state, modalService, notesService, $scope) {
    this.$state = $state;
    this.modalService = modalService;
    this.notesService = notesService;
    this.$scope = $scope;
    this._initEvents();
  }

  _initEvents() {
    this.$scope.$on('note-panel:updateCheck', (event, newStatus) => {
       this.note.$$selected = newStatus;
    });
  }

  goToDetail() {
    this.$state.go('notes.detail', { id: this.note.id });
  }

  remove() {
    this.modalService.confirm({msg: `Do you really want to remove note ${this.note.label} ?`}).then(() => {
      this.onRemove({id: this.note.id}); //quite magic params passing
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