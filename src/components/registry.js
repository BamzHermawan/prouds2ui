import mediaLog from "./mediaLog.vue";
import notified from "./notified.vue";
import linker from "./linker.vue";
import geegForm from "./easteregg.vue";
import infoFooter from "./infoFooter.vue";
import bookmarkButton from "./sidebar/bookmark.vue";

// DATATABLE
import dataTable from "./dataTable/dataTable.vue";
import dataTableNoCard from "./dataTable/nocard.vue";

// CRUD COMPONENTS
import crud from "./crud/crud.vue";
import crudForm from "./crud/crudForm.vue";
import crudInput from "./crud/crudInput.vue";

// SIDEBAR COMPONENTS
import sideItem from "./sidebar/item.vue";
import sideList from "./sidebar/list.vue";
import topNavBar from "./topNavBar.vue";

// GANTTCHART
import ganttchart from "./ganttchart.vue"

module.exports.linker = linker;
module.exports.mediaLog = mediaLog;
module.exports.notified = notified;
module.exports.geegForm = geegForm;
module.exports.infoFooter = infoFooter;
module.exports.bookmarkButton = bookmarkButton;

module.exports.dataTable = dataTable;
module.exports.dataTableNoCard = dataTableNoCard;

module.exports.crud = crud;
module.exports.crudForm = crudForm;
module.exports.crudInput = crudInput;

module.exports.sideItem = sideItem;
module.exports.sideList = sideList;
module.exports.topNavBar = topNavBar;

module.exports.ganttchart = ganttchart;