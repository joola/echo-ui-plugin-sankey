import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';
import { VisFactoryProvider } from 'ui/vis/vis_factory';

import kbnSankeyVisTemplate from 'plugins/kbn_sankey_vis/kbn_sankey_vis.html';

import 'ui/agg_table';
import 'ui/agg_table/agg_table_group';

import 'plugins/kbn_sankey_vis/kbn_sankey_vis.less';
import 'plugins/kbn_sankey_vis/kbn_sankey_vis_controller';

VisTypesRegistryProvider.register(KbnSankeyVisProvider);

function KbnSankeyVisProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const Schemas = Private(VisSchemasProvider);

  return VisFactory.createAngularVisualization({
    name: 'kbn_sankey',
    title: 'Sankey Diagram',
    icon: 'fa-random',
    description: 'Sankey charts are ideal for displaying the material, energy and cost flows.',
    template: kbnSankeyVisTemplate,
    params: {
      defaults: {
        showMetricsAtAllLevels: false
      },
      editor: '<vislib-basic-options></vislib-basic-options>'
    },
    hierarchicalData: function (vis) {
      return Boolean(vis.params.showPartialRows || vis.params.showMetricsAtAllLevels);
    },
    schemas: new Schemas([{
      group: 'metrics',
      name: 'metric',
      title: 'Split Size',
      min: 1,
      max: 1,
      defaults: [{
        type: 'count',
        schema: 'metric'
      }]
    }, {
      group: 'buckets',
      name: 'segment',
      title: 'Split Slices',
      aggFilter: '!geohash_grid',
      min: 0,
      max: Infinity
    }]),
    requiresSearch: true
  });
}
