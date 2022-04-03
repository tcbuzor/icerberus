import { Route } from '@angular/router';
import {PolEditorComponent} from "app/policy-editor/pol-editor.component";

export const polEditorRoute: Route = {
  path: 'editor',
  component: PolEditorComponent,
  data: {
    pageTitle: 'polEditor.title',
  },
};
