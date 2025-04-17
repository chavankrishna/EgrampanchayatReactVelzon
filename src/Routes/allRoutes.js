import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardAnalytics from "../pages/DashboardAnalytics";
import DashboardCrm from "../pages/DashboardCrm";
import DashboardEcommerce from "../pages/DashboardEcommerce";
import NamunaSeventeen from "../pages/Forms/BasicElements/NamunaSeventeen";
import NamunaEighteen from "../pages/Forms/BasicElements/NamunaEighteen";
import Namuna06 from "../pages/Forms/BasicElements/Namuna06";
import Gaurireport from "../pages/Forms/BasicElements/Gaurireport";
//import Namuna06Update from "../pages/Forms/BasicElements/Namuna06Update";
import UpdatePage from "../pages/Forms/BasicElements/UpdatePage";
import ViewDetails from "../pages/Forms/BasicElements/ViewDetails";

import DashboardCrypto from "../pages/DashboardCrypto";
import DashboardProject from "../pages/DashboardProject";
import DashboardNFT from "../pages/DashboardNFT";
import DashboardJob from "../pages/DashboardJob/";
import Report from "../pages/Forms/BasicElements/Reeport";
//Calendar
import MonthGrid from "../pages/Calendar/MonthGrid";
import Calendar from "../pages/Calendar/Maincalender";

// Email box
import MailInbox from "../pages/EmailInbox";
import BasicAction from "../pages/Email/EmailTemplates/BasicAction";
import EcommerceAction from "../pages/Email/EmailTemplates/EcommerceAction";

//Chat
import Chat from "../pages/Chat";

// Project
import ProjectList from "../pages/Projects/ProjectList";
import ProjectOverview from "../pages/Projects/ProjectOverview";
import CreateProject from "../pages/Projects/CreateProject";

//Task
import TaskDetails from "../pages/Tasks/TaskDetails";
import TaskList from "../pages/Tasks/TaskList";
import Kanbanboard from "../pages/Tasks/KanbanBoard";

//Transactions
import Transactions from "../pages/Crypto/Transactions";
import BuySell from "../pages/Crypto/BuySell";
import CryproOrder from "../pages/Crypto/CryptoOrder";
import MyWallet from "../pages/Crypto/MyWallet";
import ICOList from "../pages/Crypto/ICOList";
import KYCVerification from "../pages/Crypto/KYCVerification";

//Crm Pages
import CrmCompanies from "../pages/Crm/CrmCompanies";
import CrmContacts from "../pages/Crm/CrmContacts";
import CrmDeals from "../pages/Crm/CrmDeals/index";
import CrmLeads from "../pages/Crm/CrmLeads/index";

//Invoices
import InvoiceList from "../pages/Invoices/InvoiceList";
import InvoiceCreate from "../pages/Invoices/InvoiceCreate";
import InvoiceDetails from "../pages/Invoices/InvoiceDetails";

// Support Tickets
import ListView from "../pages/SupportTickets/ListView";
import TicketsDetails from "../pages/SupportTickets/TicketsDetails";

// //Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceProducts/EcommerceAddProduct";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceOrderDetail from "../pages/Ecommerce/EcommerceOrders/EcommerceOrderDetail";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
import EcommerceSellers from "../pages/Ecommerce/EcommerceSellers/index";
import EcommerceSellerDetail from "../pages/Ecommerce/EcommerceSellers/EcommerceSellerDetail";

// NFT Marketplace Pages
import Marketplace from "../pages/NFTMarketplace/Marketplace";
import Collections from "../pages/NFTMarketplace/Collections";
import CreateNFT from "../pages/NFTMarketplace/CreateNFT";
import Creators from "../pages/NFTMarketplace/Creators";
import ExploreNow from "../pages/NFTMarketplace/ExploreNow";
import ItemDetails from "../pages/NFTMarketplace/Itemdetails";
import LiveAuction from "../pages/NFTMarketplace/LiveAuction";
import Ranking from "../pages/NFTMarketplace/Ranking";
import WalletConnect from "../pages/NFTMarketplace/WalletConnect";

// Base Ui
import UiAlerts from "../pages/BaseUi/UiAlerts/UiAlerts";
import UiBadges from "../pages/BaseUi/UiBadges/UiBadges";
import UiButtons from "../pages/BaseUi/UiButtons/UiButtons";
import UiColors from "../pages/BaseUi/UiColors/UiColors";
import UiCards from "../pages/BaseUi/UiCards/UiCards";
import UiCarousel from "../pages/BaseUi/UiCarousel/UiCarousel";
import UiDropdowns from "../pages/BaseUi/UiDropdowns/UiDropdowns";
import UiGrid from "../pages/BaseUi/UiGrid/UiGrid";
import UiImages from "../pages/BaseUi/UiImages/UiImages";
import UiTabs from "../pages/BaseUi/UiTabs/UiTabs";
import UiAccordions from "../pages/BaseUi/UiAccordion&Collapse/UiAccordion&Collapse";
import UiModals from "../pages/BaseUi/UiModals/UiModals";
import UiOffcanvas from "../pages/BaseUi/UiOffcanvas/UiOffcanvas";
import UiPlaceholders from "../pages/BaseUi/UiPlaceholders/UiPlaceholders";
import UiProgress from "../pages/BaseUi/UiProgress/UiProgress";
import UiNotifications from "../pages/BaseUi/UiNotifications/UiNotifications";
import UiMediaobject from "../pages/BaseUi/UiMediaobject/UiMediaobject";
import UiEmbedVideo from "../pages/BaseUi/UiEmbedVideo/UiEmbedVideo";
import UiTypography from "../pages/BaseUi/UiTypography/UiTypography";
import UiList from "../pages/BaseUi/UiLists/UiLists";
import UiGeneral from "../pages/BaseUi/UiGeneral/UiGeneral";
import UiRibbons from "../pages/BaseUi/UiRibbons/UiRibbons";
import UiUtilities from "../pages/BaseUi/UiUtilities/UiUtilities";

// Advance Ui
import UiNestableList from "../pages/AdvanceUi/UiNestableList/UiNestableList";
import UiScrollbar from "../pages/AdvanceUi/UiScrollbar/UiScrollbar";
import UiAnimation from "../pages/AdvanceUi/UiAnimation/UiAnimation";
import UiTour from "../pages/AdvanceUi/UiTour/UiTour";
import UiSwiperSlider from "../pages/AdvanceUi/UiSwiperSlider/UiSwiperSlider";
import UiRatings from "../pages/AdvanceUi/UiRatings/UiRatings";
import UiHighlight from "../pages/AdvanceUi/UiHighlight/UiHighlight";

// Widgets
import Widgets from "../pages/Widgets/Index";

//Forms
import BasicElements from "../pages/Forms/BasicElements/BasicElements";
import FormSelect from "../pages/Forms/FormSelect/FormSelect";
import FormEditor from "../pages/Forms/FormEditor/FormEditor";
import CheckBoxAndRadio from "../pages/Forms/CheckboxAndRadio/CheckBoxAndRadio";
import Masks from "../pages/Forms/Masks/Masks";
import FileUpload from "../pages/Forms/FileUpload/FileUpload";
import FormPickers from "../pages/Forms/FormPickers/FormPickers";
import FormRangeSlider from "../pages/Forms/FormRangeSlider/FormRangeSlider";
import Formlayouts from "../pages/Forms/FormLayouts/Formlayouts";
import FormValidation from "../pages/Forms/FormValidation/FormValidation";
import FormWizard from "../pages/Forms/FormWizard/FormWizard";
import FormAdvanced from "../pages/Forms/FormAdvanced/FormAdvanced";
import Select2 from "../pages/Forms/Select2/Select2";

//Tables
import BasicTables from "../pages/Tables/BasicTables/BasicTables";
import ListTables from "../pages/Tables/ListTables/ListTables";
import ReactTable from "../pages/Tables/ReactTables";

//Icon pages
import RemixIcons from "../pages/Icons/RemixIcons/RemixIcons";
import BoxIcons from "../pages/Icons/BoxIcons/BoxIcons";
import MaterialDesign from "../pages/Icons/MaterialDesign/MaterialDesign";
import FeatherIcons from "../pages/Icons/FeatherIcons/FeatherIcons";
import LineAwesomeIcons from "../pages/Icons/LineAwesomeIcons/LineAwesomeIcons";
import CryptoIcons from "../pages/Icons/CryptoIcons/CryptoIcons";

//Maps
import GoogleMaps from "../pages/Maps/GoogleMaps/GoogleMaps";

//AuthenticationInner pages
import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
import CoverSignIn from "../pages/AuthenticationInner/Login/CoverSignIn";
import BasicSignUp from "../pages/AuthenticationInner/Register/BasicSignUp";
import CoverSignUp from "../pages/AuthenticationInner/Register/CoverSignUp";
import BasicPasswReset from "../pages/AuthenticationInner/PasswordReset/BasicPasswReset";
//pages
import Starter from "../pages/Pages/Starter/Starter";
import SimplePage from "../pages/Pages/Profile/SimplePage/SimplePage";
import Settings from "../pages/Pages/Profile/Settings/Settings";
import Team from "../pages/Pages/Team/Team";
import Timeline from "../pages/Pages/Timeline/Timeline";
import Faqs from "../pages/Pages/Faqs/Faqs";
import Pricing from "../pages/Pages/Pricing/Pricing";
import Gallery from "../pages/Pages/Gallery/Gallery";
import Maintenance from "../pages/Pages/Maintenance/Maintenance";
import ComingSoon from "../pages/Pages/ComingSoon/ComingSoon";
import SiteMap from "../pages/Pages/SiteMap/SiteMap";
import SearchResults from "../pages/Pages/SearchResults/SearchResults";

import CoverPasswReset from "../pages/AuthenticationInner/PasswordReset/CoverPasswReset";
import BasicLockScreen from "../pages/AuthenticationInner/LockScreen/BasicLockScr";
import CoverLockScreen from "../pages/AuthenticationInner/LockScreen/CoverLockScr";
import BasicLogout from "../pages/AuthenticationInner/Logout/BasicLogout";
import CoverLogout from "../pages/AuthenticationInner/Logout/CoverLogout";
import BasicSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import CoverSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg";
import BasicTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify";
import CoverTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify";
import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";
import Cover404 from "../pages/AuthenticationInner/Errors/Cover404";
import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
import Error500 from "../pages/AuthenticationInner/Errors/Error500";

import BasicPasswCreate from "../pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//APi Key
import APIKey from "../pages/APIKey/index";

//login
import Login from "../pages/Authentication/Login";
import ForgotPassword from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import VerifyOtp from "../pages/Authentication/Otp";
import NewPassword from "../pages/Authentication/Newpassword";

//Charts
import LineCharts from "../pages/Charts/ApexCharts/LineCharts";
import AreaCharts from "../pages/Charts/ApexCharts/AreaCharts";
import ColumnCharts from "../pages/Charts/ApexCharts/ColumnCharts";
import BarCharts from "../pages/Charts/ApexCharts/BarCharts";
import MixedCharts from "../pages/Charts/ApexCharts/MixedCharts";
import TimelineCharts from "../pages/Charts/ApexCharts/TimelineCharts";
import CandlestickChart from "../pages/Charts/ApexCharts/CandlestickChart";
import BoxplotCharts from "../pages/Charts/ApexCharts/BoxplotCharts";
import BubbleChart from "../pages/Charts/ApexCharts/BubbleChart";
import ScatterCharts from "../pages/Charts/ApexCharts/ScatterCharts";
import HeatmapCharts from "../pages/Charts/ApexCharts/HeatmapCharts";
import TreemapCharts from "../pages/Charts/ApexCharts/TreemapCharts";
import PieCharts from "../pages/Charts/ApexCharts/PieCharts";
import RadialbarCharts from "../pages/Charts/ApexCharts/RadialbarCharts";
import RadarCharts from "../pages/Charts/ApexCharts/RadarCharts";
import PolarCharts from "../pages/Charts/ApexCharts/PolarCharts";
import ChartsJs from "../pages/Charts/ChartsJs/index";
import Echarts from "../pages/Charts/ECharts/index";

//Job pages
import Statistics from "../pages/Jobs/Statistics";
import JobList from "../pages/Jobs/JobList/List";
import JobGrid from "../pages/Jobs/JobList/Grid";
import JobOverview from "../pages/Jobs/JobList/Overview";
import CandidateList from "../pages/Jobs/CandidateList/ListView";
import CandidateGrid from "../pages/Jobs/CandidateList/GridView";
import NewJobs from "../pages/Jobs/NewJob";
import JobCategories from "../pages/Jobs/JobCategories";
import Application from "../pages/Jobs/Application";
import CompaniesList from "../pages/Jobs/CompaniesList";

// Landing Index
import OnePage from "../pages/Landing/OnePage";
import NFTLanding from "../pages/Landing/NFTLanding";

import PrivecyPolicy from "../pages/Pages/PrivacyPolicy";
import TermsCondition from "../pages/Pages/TermsCondition";
import JobLanding from "../pages/Job_Landing/Job";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import RangeArea from "../pages/Charts/ApexCharts/RangeAreaCharts";

import FileManager from "../pages/FileManager";
import ToDoList from "../pages/ToDo";
import UILink from "../pages/BaseUi/UiLink/Index";
import FunnelCharts from "../pages/Charts/ApexCharts/FunnelCharts";
import Namuna28 from "../pages/Forms/BasicElements/Namuna28";
import Report28 from "../pages/Forms/BasicElements/Report28";
import Demo from "../pages/Forms/BasicElements/Demo";
import View28 from "../pages/Forms/BasicElements/View28";
import Update28 from "../pages/Forms/BasicElements/Update28";
import Demo2 from "../pages/Forms/BasicElements/Demo2";
import Demo3 from "../pages/Forms/BasicElements/Demo3";
import Namuna32 from "../pages/Forms/BasicElements/Namuna32";
import Report32 from "../pages/Forms/BasicElements/Report32";
import View32 from "../pages/Forms/BasicElements/View32";
import Update32 from "../pages/Forms/BasicElements/Update32";
import Namuna26kha from "../pages/Forms/BasicElements/Namuna26Kha";
import Report26kha from "../pages/Forms/BasicElements/Report26Kha";
import View26kha from "../pages/Forms/BasicElements/View26Kha";
import Update26Kha from "../pages/Forms/BasicElements/Update26Kha";
import Namuna23 from "../pages/Forms/BasicElements/Namuna23";
import Report23 from "../pages/Forms/BasicElements/Report23";
import View23 from "../pages/Forms/BasicElements/View23";
import Update23 from "../pages/Forms/BasicElements/Update23";
import Namuna27 from "../pages/Forms/BasicElements/Namuna27";
import Namuna33 from "../pages/Forms/BasicElements/Namuna33";
import Namuna30 from "../pages/Forms/BasicElements/Namuna30";
import Namuna22 from "../pages/Forms/BasicElements/Namuna22";
import Report27 from "../pages/Forms/BasicElements/Report27";
import View27 from "../pages/Forms/BasicElements/View27";
import Update27 from "../pages/Forms/BasicElements/Update27";
import Report33 from "../pages/Forms/BasicElements/Report33";
import View33 from "../pages/Forms/BasicElements/View33";
import Update33 from "../pages/Forms/BasicElements/Update33";
import Report30 from "../pages/Forms/BasicElements/Report30";
import View30 from "../pages/Forms/BasicElements/View30";
import Update30 from "../pages/Forms/BasicElements/Update30";
import Namuna17 from "../pages/Forms/BasicElements/Namuna17";
import Report17 from "../pages/Forms/BasicElements/Report17";
import View17 from "../pages/Forms/BasicElements/View17";
import Update17 from "../pages/Forms/BasicElements/Update17";
import Namuna13 from "../pages/Forms/BasicElements/Namuna13";
//import ReportPage_13 from "../pages/Forms/BasicElements/Report13";
//import Namuna13_view from "../pages/Forms/BasicElements/Namuna13View";
import Namuna13_Update from "../pages/Forms/BasicElements/Namuna13Update";
import Report22 from "../pages/Forms/BasicElements/Report22";
import Update22 from "../pages/Forms/BasicElements/Update22";
import View22 from "../pages/Forms/BasicElements/View22";
import Namuna18Form from "../pages/Forms/BasicElements/Namuna18Form";

import Form21 from "../pages/Forms/BasicElements/Form 21";
import Report21 from "../pages/Forms/BasicElements/Report 21";
import View21 from "../pages/Forms/BasicElements/View 21";
import Update21 from "../pages/Forms/BasicElements/Update 21";
import Form24 from "../pages/Forms/BasicElements/Form 24";
import Report24 from "../pages/Forms/BasicElements/Report 24";
import View24 from "../pages/Forms/BasicElements/View 24";
import Update24 from "../pages/Forms/BasicElements/Update 24";
import Namuna18First from "../pages/Forms/BasicElements/Namuna18Form";
import Namuna18Report from "../pages/Forms/BasicElements/Namuna18Report";
import ViewDetails18 from "../pages/Forms/BasicElements/ViewDetails18";
import Namuna18Update from "../pages/Forms/BasicElements/Namuna18Update";
import Namuna18Update2 from "../pages/Forms/BasicElements/Namuna18Update2";
import Namuna18Form2 from "../pages/Forms/BasicElements/Namuna18Form2";
import Namuna18View2 from "../pages/Forms/BasicElements/Namuna18View2";
import Namuna18Report2 from "../pages/Forms/BasicElements/Namuna18Report2";
//import Namuna06Report2 from "../pages/Forms/BasicElements/Namuna06Report";
import Namuna8 from "../pages/Forms/BasicElements/NamunaEight";
import Namuna20 from "../pages/Forms/BasicElements/NamunaTwenty";
import Namuna11 from "../pages/Forms/BasicElements/Namuna11";
import Namuna14 from "../pages/Forms/BasicElements/NamunaFourteen";
import Namuna20Update from "../pages/Forms/BasicElements/Namuna20Update";
import Namuna20Report2 from "../pages/Forms/BasicElements/Namuna20Report2";
import Namuna8View from "../pages/Forms/BasicElements/Namuna8View";
import Namuna8Update from "../pages/Forms/BasicElements/Namuna8Update";
import Namuna8Report2 from "../pages/Forms/BasicElements/Namuna8Report2";
import Namuna11Update from "../pages/Forms/BasicElements/Namuna11Update";
import Namuna11Report2 from "../pages/Forms/BasicElements/Namuna11Report";
import Namuna11View from "../pages/Forms/BasicElements/Namuna11View";
import Namuna14Update from "../pages/Forms/BasicElements/Namuna14Update";
import Namuna14Report2 from "../pages/Forms/BasicElements/Namuna14Report2";
import Namuna14View from "../pages/Forms/BasicElements/Namuna14View";
import Namuna20View from "../pages/Forms/BasicElements/Namuna20View";
import Print33 from "../pages/Forms/BasicElements/Print33";
import Print32 from "../pages/Forms/BasicElements/Print32";
import Namuna25 from "../pages/Forms/BasicElements/Namuna25";
import Report25 from "../pages/Forms/BasicElements/Report25";
import View25 from "../pages/Forms/BasicElements/View25";
import Update25 from "../pages/Forms/BasicElements/Update25";
import Form from "../pages/Forms/BasicElements/Form ";
import ReportUser from "../pages/Forms/BasicElements/ReportUser";
import Namuna09 from "../pages/Forms/BasicElements/Namuna9";
// import Namuna09_update from "../pages/Forms/BasicElements/namuna09_update";
import Namuna09_view from "../pages/Forms/BasicElements/Namuna09_view";
import ReportPage_09 from "../pages/Forms/BasicElements/ReportPage_09";

import Namuna10 from "../pages/Forms/BasicElements/Namuna10";
import Namuna10Report from "../pages/Forms/BasicElements/Namuna10Report";
import { components } from "react-select";
import Namuna10Update from "../pages/Forms/BasicElements/Namuna10Update";
import Namuna10View from "../pages/Forms/BasicElements/Namuna10View";
import Namuna10Report1 from "../pages/Forms/BasicElements/Namuna10Report1";
import Namuna10_1 from "../pages/Forms/BasicElements/Namuna10_1";
import Namuna10Update1 from "../pages/Forms/BasicElements/Namuna10Update1";
import Namuna14Mudrank from "../pages/Forms/BasicElements/Namuna14Mudrank";
import Namuna14MudrankReport from "../pages/Forms/BasicElements/Namuna14MudrankReport";
import Namuna14MudrankUpdate from "../pages/Forms/BasicElements/Namuna14MudrankUpdate";
import Namuna14MudrankView from "../pages/Forms/BasicElements/Namuna14MudrankView";
import Namuna2 from "../pages/Forms/BasicElements/Namuna2";
import Namuna2Report from "../pages/Forms/BasicElements/Namuna2Report"; 
import Namuna2View from "../pages/Forms/BasicElements/Namuna2View";
import Namuna2Update from "../pages/Forms/BasicElements/Namuna2Update";
import Namuna06Report from "../pages/Forms/BasicElements/Namuna06Report";
import Namuna06View from "../pages/Forms/BasicElements/Namuna06View"
import Namuna06Update from "../pages/Forms/BasicElements/Namuna06Update";
import Namana5C from "../pages/Forms/BasicElements/Namuna5C"; 
import Namuna5CReport from "../pages/Forms/BasicElements/Namuna5CReport";
import Namana5CUpdate from "../pages/Forms/BasicElements/Namuna5CUpdate";
import Namuna5CView from "../pages/Forms/BasicElements/Namuna5CView";
import Namuna9 from "../pages/Forms/BasicElements/Namuna9";
import Namuna9Report from "../pages/Forms/BasicElements/Namuna9Report";
import Namuna11Report from "../pages/Forms/BasicElements/Namuna11Report";
import Namuna13Report from "../pages/Forms/BasicElements/Namuna13Report";
import Namuna13View from "../pages/Forms/BasicElements/Namuna13View";
import Namuna13Update from "../pages/Forms/BasicElements/Namuna13Update";




//import Namuna06Update from "../pages/Forms/BasicElements/Namuna06Update"

//import Nanuna10Report1 from "../pages/Forms/BasicElements/Namuna10Report1" 

const authProtectedRoutes = [
  { path: "/dashboard-analytics", component: <DashboardAnalytics /> },
  { path: "/dashboard-crm", component: <DashboardCrm /> },
  { path: "/dashboard", component: <DashboardEcommerce /> }, 
  { path: "/index", component: <DashboardEcommerce /> },
  { path: "/dashboard-crypto", component: <DashboardCrypto /> },  
  { path: "/dashboard-projects", component: <DashboardProject /> },
  { path: "/dashboard-nft", component: <DashboardNFT /> },
  { path: "/dashboard-job", component: <DashboardJob /> },
  { path: "/apps-calendar", component: <Calendar /> },
  { path: "/apps-calendar-month-grid", component: <MonthGrid /> },
  { path: "/apps-ecommerce-products", component: <EcommerceProducts /> },
  { path: "/apps-ecommerce-product-details/:_id", component: <EcommerceProductDetail /> },
  { path: "/apps-ecommerce-product-details", component: <EcommerceProductDetail /> },
  { path: "/apps-ecommerce-add-product", component: <EcommerceAddProduct /> },
  { path: "/apps-ecommerce-orders", component: <EcommerceOrders /> },
  { path: "/apps-ecommerce-order-details", component: <EcommerceOrderDetail /> },
  { path: "/apps-ecommerce-customers", component: <EcommerceCustomers /> },
  { path: "/apps-ecommerce-cart", component: <EcommerceCart /> },
  { path: "/apps-ecommerce-checkout", component: <EcommerceCheckout /> },
  { path: "/apps-ecommerce-sellers", component: <EcommerceSellers /> },
  { path: "/apps-ecommerce-seller-details", component: <EcommerceSellerDetail /> },

  { path: "/apps-file-manager", component: <FileManager /> },
  { path: "/apps-todo", component: <ToDoList /> },

  //Chat
  { path: "/apps-chat", component: <Chat /> },

  //EMail
  { path: "/apps-mailbox", component: <MailInbox /> },
  { path: "/apps-email-basic", component: <BasicAction /> },
  { path: "/apps-email-ecommerce", component: <EcommerceAction /> },

  //Projects
  { path: "/apps-projects-list", component: <ProjectList /> },
  { path: "/apps-projects-overview", component: <ProjectOverview /> },
  { path: "/apps-projects-create", component: <CreateProject /> },

  //Task
  { path: "/apps-tasks-list-view", component: <TaskList /> },
  { path: "/apps-tasks-details", component: <TaskDetails /> },
  { path: "/apps-tasks-kanban", component: <Kanbanboard /> },

  //Api Key
  { path: "/apps-api-key", component: <APIKey /> },
  { path: "/gauri", component: <NamunaSeventeen /> },
  { path: "/nikita1", component: <NamunaEighteen /> },

  { path: "/gaurireport", component: <Gaurireport /> },

  { path: "/report", component: <Report /> },

  { path: "/demo", component: <Demo /> },
  { path: "/demo2", component: <Demo2 /> },
  { path: "/demo3", component: <Demo3 /> },


  //----------------------------------------------------------------------------
  //krishna
  // Namuna2 
  {path: "/नमुना-२", component: <Namuna2 />},
  {path: "/नमुना-२-अहवाल", component: <Namuna2Report />},
  {path: "/नमुना-२-पाहणी-पृष्ठ", component: <Namuna2View />},
  {path: "/नमुना-२-अपडेट", component: <Namuna2Update />},

  //namuna 5 
  { path: "/नमुना-५", component: <Namana5C /> },
  { path: "/नमुना-५-अहवाल", component:<Namuna5CReport /> },
  { path: "/नमुना-५-अपडेट", component:<Namana5CUpdate /> },
  { path: "/नमुना-५-पाहणी-पृष्ठ", component:<Namuna5CView /> }, 

//Namuna 6
  { path: "/नमुना-६", component: <Namuna06 /> },
  { path: "/नमुना-६-अहवाल", component: <Namuna06Report /> },
  { path: "/नमुना-६-अपडेट", component: <Namuna06Update /> },
  { path: "/नमुना-६-पाहणी-पृष्ठ", component: <Namuna06View /> },

//Namuna 9
 { path: "/नमुना-९", component: <Namuna9 /> },
 { path: "/नमुना-९-अहवाल", component: <Namuna9Report /> },



 //11
 { path: "/नमुना-११", component: <Namuna11 /> },
 { path: "/नमुना-११-अपडेट", component: <Namuna11Update /> },
 { path: "/नमुना-११-अहवाल", component: <Namuna11Report /> },
 { path: "/नमुना-११-पाहणी-पृष्ठ", component: <Namuna11View /> },


  //-----------------------------------------------------------------------------------------------------------
  //Vishal
  //namuna23
  { path: "/नमुना-२३", component: <Namuna23 /> },
  { path: "/नमुना-२३-अहवाल", component: <Report23 /> }, 
  { path: "/नमुना-२३-पाहणी-पृष्ठ", component: <View23 /> },
  { path: "/नमुना-२३-अपडेट", component: <Update23 /> },
  
  
  //namuna30
  { path: "/नमुना-३०", component: <Namuna30 /> },
  { path: "नमुना-३०-अहवाल", component: <Report30 /> },
  { path: "/नमुना-३०-पाहणी-पृष्ठ", component: <View30 /> },
  { path: "/नमुना-३०-अपडेट", component: <Update30 /> },

  //------------------------------------------------------------------------------------------------------
  //Auth
  { path: "/form", component: <Form /> },
  { path: "/report_user", component: <ReportUser /> },
  //--------------------------------------------------------------------------------------------------------
  //Gaurav
  //namuna32
  { path: "/नमुना-३२", component: <Namuna32 /> },
  { path: "/नमुना-३२-अहवाल", component: <Report32 /> },
  { path: "/नमुना-३२-पाहणी-पृष्ठ", component: <View32 /> },
  { path: "/नमुना-३२-अपडेट", component: <Update32 /> }, 
  { path: "/print32", component: <Print32 /> },
  //namuna33
  { path: "/नमुना-३३", component: <Namuna33 /> },
  { path: "/नमुना-३३-अहवाल", component: <Report33 /> },
  { path: "/नमुना-३३-पाहणी-पृष्ठ", component: <View33 /> },
  { path: "/नमुना-३३-अपडेट", component: <Update33 /> },
  { path: "/print33", component: <Print33 /> },
  //-----------------------------------------------------------------------------------------------------------
  //Satteshwari
  //namuna26Kha
  { path: "/नमुना-२६-ख", component: <Namuna26kha /> },
  { path: "/नमुना-२६-ख-अहवाल", component: <Report26kha /> },
  { path: "/नमुना-२६-ख-पाहणी-पृष्ठ", component: <View26kha /> },
  { path: "/नमुना-२६-ख-अपडेट", component: <Update26Kha /> },
  //namuna22
  { path: "/नमुना-२२", component: <Namuna22 /> },
  { path: "/नमुना-२२-अहवाल", component: <Report22 /> },
  { path: "/नमुना-२२-अपडेट", component: <Update22 /> },
  { path: "/नमुना-२२-पाहणी-पृष्ठ", component: <View22 /> },

  //------------------------------------------------------------------------------------------------------------
  //Jitu

  //namuna28
  { path: "/नमुना-२८", component: <Namuna28 /> },
  { path: "/नमुना-२८-अहवाल", component: <Report28 /> },
  { path: "/नमुना-२८-पाहणी-पृष्ठ", component: <View28 /> },
  { path: "/नमुना-२८-अपडेट", component: <Update28 /> },
  
  //namuna27
  { path: "/नमुना-२७", component: <Namuna27 /> },
  { path: "/नमुना-२७-अहवाल", component: <Report27 /> },
  { path: "/नमुना-२७-पाहणी-पृष्ठ", component: <View27 /> },
  { path: "/नमुना-२७-अपडेट", component: <Update27 /> },
  //---------------------------------------------------------------------------------------------------------------
  
  
  
  //Gauri Mam
  //not correct
  { path: "/नमुना-१७", component: <Namuna17 /> },
  { path: "/नमुना-१७-अहवाल", component: <Report17 /> },
  { path: "/नमुना-१७-पाहणी-पृष्ठ", component: <View17 /> },
  { path: "/नमुना-१७-अपडेट", component: <Update17 /> },

  //25
  { path: "/नमुना-२५", component: <Namuna25 /> },
  { path: "/नमुना-२५-अहवाल", component: <Report25 /> },
  { path: "/नमुना-२५-पाहणी-पृष्ठ", component: <View25 /> },
  { path: "/नमुना-२५-अपडेट", component: <Update25 /> },


  //-----------------------------------------------------------------------------------------------------------------------
  //
  //13
  { path: "/नमुना-१३", component: <Namuna13 /> },
  { path: "/नमुना-१३-अहवाल", component: <Namuna13Report /> },
  { path: "/नमुना-१३-पाहणी-पृष्ठ", component: <Namuna13View /> },
  { path: "/नमुना-१३-अपडेट", component: <Namuna13Update /> }, 
  
  //09
  //{ path: "/Namuna09_view", component: <Namuna09_view /> },
  //{ path: "/namuna09", component: <Namuna09 /> },
 // { path: "/Report09", component: <ReportPage_09 /> },
  // { path: "/Namuna09_update", component: <Namuna09_update /> },

  //-----------------------------------------------------------------------------------------------
  
  // Form 21
  { path: "/form-details", component: <Form21 /> },
  { path: "/report-details", component: <Report21 /> },
  { path: "/view-details", component: <View21 /> },
  { path: "/update-details", component: <Update21 /> },
  //18-1
  { path: "/Namuna18Form", component: <Namuna18Form /> },
  { path: "/Namuna18Report", component: <Namuna18Report /> },
  { path: "/ViewDetails18", component: <ViewDetails18 /> },
  { path: "/Namuna18Update", component: <Namuna18Update /> },
  //18-2
  { path: "/Namuna18Form2", component: <Namuna18Form2 /> },
  { path: "/Namuna18Update2", component: <Namuna18Update2 /> },
  { path: "/Namuna18View2", component: <Namuna18View2 /> },
  { path: "/Namuna18Report2", component: <Namuna18Report2 /> },

  // Form 24
  { path: "/form-details-24", component: <Form24 /> },
  { path: "/report-details-24", component: <Report24 /> },
  { path: "/view-details-24", component: <View24 /> },
  { path: "/update-details-24", component: <Update24 /> }, 
  //-----------------------------------------------------------------------------
  //20

  { path: "/नमुना-२०", component: <Namuna20 /> },
  { path: "/नमुना-२०-अहवाल", component: <Namuna20Report2 /> },
  { path: "/Namuna20Update", component: <Namuna20Update /> },
  { path: "/नमुना-२०-अपडेट", component: <Namuna20Update /> },
  { path: "/नमुना-२०-पाहणी-पृष्ठ", component: <Namuna20View /> },
  

  //------------------------------------------------------------------------------ //  
  // 10 
  // krishna 
  { path: "/namuna10" , component:<Namuna10 /> } , 
  
  { path: "/namuna10report" , component:<Namuna10Report /> } , 
  { path: "/namuna10update" , component:<Namuna10Update /> } ,    
  
  { path: "/namuna10view" , component:<Namuna10View /> } ,
  { path: "/namuna10delete" , component:<Namuna10Update /> } , 

  { path: "/namuna10_1" , component:<Namuna10_1 /> } , 
  { path: "/namuna10report1" , component:<Namuna10Report1 /> } , 
  { path: "/namuna10update1" , component:<Namuna10Update1 /> } , 
 
 
  //14
  { path: "/नमुना-१४", component: <Namuna14 /> },
  { path: "/नमुना-१४-अपडेट", component: <Namuna14Update /> },
  { path: "/नमुना-१४-अहवाल", component: <Namuna14Report2 /> },
  { path: "/नमुना-१4-पाहणी-पृष्ठ", component: <Namuna14View /> },


  //krishna 
  //14 
  { path : "/namuna14mudrank" , component: <Namuna14Mudrank />  },
  { path : "/namuna14mudrankreport" , component: <Namuna14MudrankReport /> },
  { path : "/namuna14mudrankupdate" , component: <Namuna14MudrankUpdate /> },
  { path : "/namuna14mudrankview" , component: <Namuna14MudrankView /> } ,

  //8
  { path: "/नमुना-८", component: <Namuna8 /> },
  { path: "/नमुना-८-अपडेट", component: <Namuna8Update /> },
  { path: "/नमुना-८-पाहणी-पृष्ठ", component: <Namuna8View /> },
  { path: "/नमुना-८-अहवाल", component: <Namuna8Report2 /> },

  //-------------------------------------------------------------------------------------------------------------------
  //Crm
  { path: "/apps-crm-contacts", component: <CrmContacts /> },
  { path: "/apps-crm-companies", component: <CrmCompanies /> },
  { path: "/apps-crm-deals", component: <CrmDeals /> },
  { path: "/apps-crm-leads", component: <CrmLeads /> },

  //Invoices
  { path: "/apps-invoices-list", component: <InvoiceList /> },
  { path: "/apps-invoices-details", component: <InvoiceDetails /> },
  { path: "/apps-invoices-create", component: <InvoiceCreate /> },

  //Supports Tickets
  { path: "/apps-tickets-list", component: <ListView /> },
  { path: "/apps-tickets-details", component: <TicketsDetails /> },

  //transactions
  { path: "/apps-crypto-transactions", component: <Transactions /> },
  { path: "/apps-crypto-buy-sell", component: <BuySell /> },
  { path: "/apps-crypto-orders", component: <CryproOrder /> },
  { path: "/apps-crypto-wallet", component: <MyWallet /> },
  { path: "/apps-crypto-ico", component: <ICOList /> },
  { path: "/apps-crypto-kyc", component: <KYCVerification /> },

  // NFT Marketplace
  { path: "/apps-nft-marketplace", component: <Marketplace /> },
  { path: "/apps-nft-collections", component: <Collections /> },
  { path: "/apps-nft-create", component: <CreateNFT /> },
  { path: "/apps-nft-creators", component: <Creators /> },
  { path: "/apps-nft-explore", component: <ExploreNow /> },
  { path: "/apps-nft-item-details", component: <ItemDetails /> },
  { path: "/apps-nft-auction", component: <LiveAuction /> },
  { path: "/apps-nft-ranking", component: <Ranking /> },
  { path: "/apps-nft-wallet", component: <WalletConnect /> },

  //charts
  { path: "/charts-apex-line", component: <LineCharts /> },
  { path: "/charts-apex-area", component: <AreaCharts /> },
  { path: "/charts-apex-column", component: <ColumnCharts /> },
  { path: "/charts-apex-bar", component: <BarCharts /> },
  { path: "/charts-apex-mixed", component: <MixedCharts /> },
  { path: "/charts-apex-timeline", component: <TimelineCharts /> },
  { path: "/charts-apex-range-area", component: <RangeArea /> },
  { path: "/charts-apex-funnel", component: <FunnelCharts /> },
  { path: "/charts-apex-candlestick", component: <CandlestickChart /> },
  { path: "/charts-apex-boxplot", component: <BoxplotCharts /> },
  { path: "/charts-apex-bubble", component: <BubbleChart /> },
  { path: "/charts-apex-scatter", component: <ScatterCharts /> },
  { path: "/charts-apex-heatmap", component: <HeatmapCharts /> },
  { path: "/charts-apex-treemap", component: <TreemapCharts /> },
  { path: "/charts-apex-pie", component: <PieCharts /> },
  { path: "/charts-apex-radialbar", component: <RadialbarCharts /> },
  { path: "/charts-apex-radar", component: <RadarCharts /> },
  { path: "/charts-apex-polar", component: <PolarCharts /> },

  { path: "/charts-chartjs", component: <ChartsJs /> },
  { path: "/charts-echarts", component: <Echarts /> },

  // Base Ui
  { path: "/ui-alerts", component: <UiAlerts /> },
  { path: "/ui-badges", component: <UiBadges /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-dropdowns", component: <UiDropdowns /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-tabs", component: <UiTabs /> },
  { path: "/ui-accordions", component: <UiAccordions /> },
  { path: "/ui-modals", component: <UiModals /> },
  { path: "/ui-offcanvas", component: <UiOffcanvas /> },
  { path: "/ui-placeholders", component: <UiPlaceholders /> },
  { path: "/ui-progress", component: <UiProgress /> },
  { path: "/ui-notifications", component: <UiNotifications /> },
  { path: "/ui-media", component: <UiMediaobject /> },
  { path: "/ui-embed-video", component: <UiEmbedVideo /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-lists", component: <UiList /> },
  { path: "/ui-links", component: <UILink /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-ribbons", component: <UiRibbons /> },
  { path: "/ui-utilities", component: <UiUtilities /> },

  // Advance Ui
  { path: "/advance-ui-nestable", component: <UiNestableList /> },
  { path: "/advance-ui-scrollbar", component: <UiScrollbar /> },
  { path: "/advance-ui-animation", component: <UiAnimation /> },
  { path: "/advance-ui-tour", component: <UiTour /> },
  { path: "/advance-ui-swiper", component: <UiSwiperSlider /> },
  { path: "/advance-ui-ratings", component: <UiRatings /> },
  { path: "/advance-ui-highlight", component: <UiHighlight /> },

  // Widgets
  { path: "/widgets", component: <Widgets /> },

  // Forms
  { path: "/forms-elements", component: <BasicElements /> },
  { path: "/forms-select", component: <FormSelect /> },
  { path: "/forms-editors", component: <FormEditor /> },
  { path: "/forms-checkboxes-radios", component: <CheckBoxAndRadio /> },
  { path: "/forms-masks", component: <Masks /> },
  { path: "/forms-file-uploads", component: <FileUpload /> },
  { path: "/forms-pickers", component: <FormPickers /> },
  { path: "/forms-range-sliders", component: <FormRangeSlider /> },
  { path: "/forms-layouts", component: <Formlayouts /> },
  { path: "/forms-validation", component: <FormValidation /> },
  { path: "/forms-wizard", component: <FormWizard /> },
  { path: "/forms-advanced", component: <FormAdvanced /> },
  { path: "/forms-select2", component: <Select2 /> },

  //Tables
  { path: "/tables-basic", component: <BasicTables /> },
  { path: "/tables-listjs", component: <ListTables /> },
  { path: "/tables-react", component: <ReactTable /> },

  //Icons
  { path: "/icons-remix", component: <RemixIcons /> },
  { path: "/icons-boxicons", component: <BoxIcons /> },
  { path: "/icons-materialdesign", component: <MaterialDesign /> },
  { path: "/icons-feather", component: <FeatherIcons /> },
  { path: "/icons-lineawesome", component: <LineAwesomeIcons /> },
  { path: "/icons-crypto", component: <CryptoIcons /> },

  //Maps
  { path: "/maps-google", component: <GoogleMaps /> },

  //Pages
  { path: "/pages-starter", component: <Starter /> },
  { path: "/pages-profile", component: <SimplePage /> },
  { path: "/pages-profile-settings", component: <Settings /> },
  { path: "/pages-team", component: <Team /> },
  { path: "/pages-timeline", component: <Timeline /> },
  { path: "/pages-faqs", component: <Faqs /> },
  { path: "/pages-gallery", component: <Gallery /> },
  { path: "/pages-pricing", component: <Pricing /> },
  { path: "/pages-sitemap", component: <SiteMap /> },
  { path: "/pages-search-results", component: <SearchResults /> },

  //Job pages
  { path: "/apps-job-statistics", component: <Statistics /> },
  { path: "/apps-job-lists", component: <JobList /> },
  { path: "/apps-job-grid-lists", component: <JobGrid /> },
  { path: "/apps-job-details", component: <JobOverview /> },
  { path: "/apps-job-candidate-lists", component: <CandidateList /> },
  { path: "/apps-job-candidate-grid", component: <CandidateGrid /> },
  { path: "/apps-job-application", component: <Application /> },
  { path: "/apps-job-new", component: <NewJobs /> },
  { path: "/apps-job-companies-lists", component: <CompaniesList /> },
  { path: "/apps-job-categories", component: <JobCategories /> },

  { path: "/pages-privacy-policy", component: <PrivecyPolicy /> },
  { path: "/pages-terms-condition", component: <TermsCondition /> },

  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
  { path: "/register", component: <Register /> },
  { path: "/verify-otp", component: <VerifyOtp /> },
  { path: "/new-password", component: <NewPassword /> },

  //AuthenticationInner pages
  { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-signin-cover", component: <CoverSignIn /> },
  { path: "/auth-signup-basic", component: <BasicSignUp /> },
  { path: "/auth-signup-cover", component: <CoverSignUp /> },
  { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  { path: "/auth-logout-basic", component: <BasicLogout /> },
  { path: "/auth-logout-cover", component: <CoverLogout /> },
  { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-coming-soon", component: <ComingSoon /> },

  { path: "/landing", component: <OnePage /> },
  { path: "/nft-landing", component: <NFTLanding /> },
  { path: "/job-landing", component: <JobLanding /> },

  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> },
];

export { authProtectedRoutes, publicRoutes };





