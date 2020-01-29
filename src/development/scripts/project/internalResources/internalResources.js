import Vue from 'vue';
import 'helper-filter';
import Buefy from 'buefy';
import Loader from 'helper-loader';
import { searchFilter } from 'helper-tools';

import resourceRow from './resourceRow.vue';
import resourceTable from './resourcePlan.vue';

const implantTag = document.querySelector('#implantedJSON');
const implantData = JSON.parse(implantTag.innerHTML);

Vue.use(Buefy);
new Vue({
    el: '#contentApp',
    components: {
        resourceRow,
        resourceTable
    },
    data: {
        resources: {
            raw: [],
            query: ''
        },
    },
    computed: {
        filtered() {
            return searchFilter(
                this.resources.raw,
                this.resources.query
            );
        }
    },
    mounted() {
        this.resources.raw = implantData;
        Loader.hide();
    }
});