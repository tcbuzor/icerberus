import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cerbac-type',
        data: { pageTitle: 'cerberuxApp.cerbacType.home.title' },
        loadChildren: () => import('./cerbac-type/cerbac-type.module').then(m => m.CerbacTypeModule),
      },
      {
        path: 'cerbac-action',
        data: { pageTitle: 'cerberuxApp.cerbacAction.home.title' },
        loadChildren: () => import('./cerbac-action/cerbac-action.module').then(m => m.CerbacActionModule),
      },
      {
        path: 'cerbac-who',
        data: { pageTitle: 'cerberuxApp.cerbacWho.home.title' },
        loadChildren: () => import('./cerbac-who/cerbac-who.module').then(m => m.CerbacWhoModule),
      },
      {
        path: 'cerbac-who-prop',
        data: { pageTitle: 'cerberuxApp.cerbacWhoProp.home.title' },
        loadChildren: () => import('./cerbac-who-prop/cerbac-who-prop.module').then(m => m.CerbacWhoPropModule),
      },
      {
        path: 'cerbac-what',
        data: { pageTitle: 'cerberuxApp.cerbacWhat.home.title' },
        loadChildren: () => import('./cerbac-what/cerbac-what.module').then(m => m.CerbacWhatModule),
      },
      {
        path: 'cerbac-what-action',
        data: { pageTitle: 'cerberuxApp.cerbacWhatAction.home.title' },
        loadChildren: () => import('./cerbac-what-action/cerbac-what-action.module').then(m => m.CerbacWhatActionModule),
      },
      {
        path: 'cerbac-what-prop',
        data: { pageTitle: 'cerberuxApp.cerbacWhatProp.home.title' },
        loadChildren: () => import('./cerbac-what-prop/cerbac-what-prop.module').then(m => m.CerbacWhatPropModule),
      },
      {
        path: 'cerbac-when',
        data: { pageTitle: 'cerberuxApp.cerbacWhen.home.title' },
        loadChildren: () => import('./cerbac-when/cerbac-when.module').then(m => m.CerbacWhenModule),
      },
      {
        path: 'cerbac-where',
        data: { pageTitle: 'cerberuxApp.cerbacWhere.home.title' },
        loadChildren: () => import('./cerbac-where/cerbac-where.module').then(m => m.CerbacWhereModule),
      },
      {
        path: 'cerbac-where-origin',
        data: { pageTitle: 'cerberuxApp.cerbacWhereOrigin.home.title' },
        loadChildren: () => import('./cerbac-where-origin/cerbac-where-origin.module').then(m => m.CerbacWhereOriginModule),
      },
      {
        path: 'cerbac-where-target',
        data: { pageTitle: 'cerberuxApp.cerbacWhereTarget.home.title' },
        loadChildren: () => import('./cerbac-where-target/cerbac-where-target.module').then(m => m.CerbacWhereTargetModule),
      },
      {
        path: 'cerbac-how',
        data: { pageTitle: 'cerberuxApp.cerbacHow.home.title' },
        loadChildren: () => import('./cerbac-how/cerbac-how.module').then(m => m.CerbacHowModule),
      },
      {
        path: 'cerbac-why',
        data: { pageTitle: 'cerberuxApp.cerbacWhy.home.title' },
        loadChildren: () => import('./cerbac-why/cerbac-why.module').then(m => m.CerbacWhyModule),
      },
      {
        path: 'cerbac-entity',
        data: { pageTitle: 'cerberuxApp.cerbacEntity.home.title' },
        loadChildren: () => import('./cerbac-entity/cerbac-entity.module').then(m => m.CerbacEntityModule),
      },
      {
        path: 'cerbac-entity-prop',
        data: { pageTitle: 'cerberuxApp.cerbacEntityProp.home.title' },
        loadChildren: () => import('./cerbac-entity-prop/cerbac-entity-prop.module').then(m => m.CerbacEntityPropModule),
      },
      {
        path: 'cerbac-policy',
        data: { pageTitle: 'cerberuxApp.cerbacPolicy.home.title' },
        loadChildren: () => import('./cerbac-policy/cerbac-policy.module').then(m => m.CerbacPolicyModule),
      },
      {
        path: 'cerbac-policy-rule',
        data: { pageTitle: 'cerberuxApp.cerbacPolicyRule.home.title' },
        loadChildren: () => import('./cerbac-policy-rule/cerbac-policy-rule.module').then(m => m.CerbacPolicyRuleModule),
      },
      {
        path: 'cerbac-ontology',
        data: { pageTitle: 'cerberuxApp.cerbacOntology.home.title' },
        loadChildren: () => import('./cerbac-ontology/cerbac-ontology.module').then(m => m.CerbacOntologyModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
