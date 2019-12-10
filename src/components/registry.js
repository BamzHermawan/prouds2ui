import linker from "./linker.vue";
import notified from "./notified.vue";
import geegForm from "./easteregg.vue";
import fileMedia from "./fileMedia.vue";
import infoFooter from "./infoFooter.vue";
import progressBar from "./progressBar.vue";
import notificationLog from "./notificationLog.vue";
import bookmarkButton from "./sidebar/bookmark.vue";

// DATATABLE
import pindexTable from "./dataTable/pIndex.vue";
import dataTable from "./dataTable/dataTable.vue";
import treeTable from "./dataTable/treeTable.vue";
import dataTableNoCard from "./dataTable/nocard.vue";

// TIMESHEET
import taskGroup from "./timesheet/taskGroup.vue";
import taskCard from "./timesheet/task.vue";

// CRUD COMPONENTS
import crud from "./crud/crud.vue";
import crudForm from "./crud/crudForm.vue";
import crudInput from "./crud/crudInput.vue";

// SIDEBAR COMPONENTS
import sideItem from "./sidebar/item.vue";
import sideList from "./sidebar/list.vue";
import topNavBar from "./topNavBar.vue";

// CHART
import hChart from "./chart/hchart.vue";
import ganttchart from "./ganttchart.vue";

module.exports.linker = linker;
module.exports.notified = notified;
module.exports.geegForm = geegForm;
module.exports.fileMedia = fileMedia;
module.exports.infoFooter = infoFooter;
module.exports.progressBar = progressBar;
module.exports.bookmarkButton = bookmarkButton;
module.exports.notificationLog = notificationLog;

module.exports.dataTable = dataTable;
module.exports.treeTable = treeTable;
module.exports.pindexTable = pindexTable;
module.exports.dataTableNoCard = dataTableNoCard;

module.exports.taskGroup = taskGroup;
module.exports.taskCard = taskCard;

module.exports.crud = crud;
module.exports.crudForm = crudForm;
module.exports.crudInput = crudInput;

module.exports.sideItem = sideItem;
module.exports.sideList = sideList;
module.exports.topNavBar = topNavBar;

module.exports.hChart = hChart;
module.exports.ganttchart = ganttchart;