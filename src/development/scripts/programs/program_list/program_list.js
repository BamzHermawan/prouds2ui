import Vue from 'vue';
import Buefy from 'buefy';
import 'helper-filter';
import programForm from './form.vue';
import programTable from './table.vue';
import {
    statusTooltip,
    sOption,
    linker,
    Paging,
    PagingPage
} from "components";

const implantTag = document.querySelector('#implantedJSON');
const implantData = JSON.parse(implantTag.innerHTML);

Vue.use(Buefy);
new Vue({
    el: '#contentApp',
    components: {
        statusTooltip,
        sOption,
        linker,
        Paging,
        PagingPage,
        programForm,
        programTable
    },
    data: {
        program: undefined,
        programs: [],
        units: [],
        managers: []
    },
    methods: {
        changePage(key, program = undefined) {
            this.program = program;
            this.$refs.paging.showPage(key);
        }
    },
    beforeMount() {
        this.units = implantData.units;
        this.programs = implantData.programs;
        this.managers = implantData.managers;
    },
    mounted() {
        global.$loader.hide();
    }
});