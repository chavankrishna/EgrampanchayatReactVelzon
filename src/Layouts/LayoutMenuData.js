import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const navigate = useNavigate();

  const [isDashboard, setIsDashboard] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [currentState, setCurrentState] = useState("डॅशबोर्ड");

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");

    if (currentState !== "डॅशबोर्ड") {
      setIsDashboard(false);
    }
    if (currentState !== "Master Data") {
      setIsPages(false);
    }
  }, [navigate, currentState]);

  const menuItems = [
    {
      id: "डॅशबोर्ड",
      label: "डॅशबोर्ड",
      icon: "ri-dashboard-2-line",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("डॅशबोर्ड");
      },
    },
    {
      id: "Master Data",
      label: "Master Data",
      icon: "ri-creative-commons-by-fill",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Master Data");
      },
      subItems: [
        { id: "addUser", label: "Add User", link: "/form", parentId: "Master Data" },
        { id: "addGrampanchayat", label: "Add Grampanchayat", link: "/add-grampanchayat", parentId: "Master Data" },
        { id: "addData", label: "Add Data", link: "/add-data", parentId: "Master Data" },
      ],
    },

    {
      id: "authentication",
      label: "नमुना यादी",
      icon: "ri-apps-fill",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsPages(!isPages);
        setIscurrentState("Auth");
      },
      stateVariables: isPages,
      subItems: [
        {
          id: "signIn",
          label: "नमुना क्र. ०१ ते ०५",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsProfile(!isProfile);
          },
          parentId: "authentication",
          stateVariables: isProfile,
          childItems: [
            { id: 1, label: "पुनर्विनियोजन व नियत वाटप", link: "/नमुना-२-अहवाल" },   // namuna 2
            { id: 2, label: "ग्रामपंचायत जमा खर्च विवरण", link: "/auth-signin-cover" },
            { id: 3, label: "ग्रामपंचायतीची मत्ता दायत्वे", link: "/auth-signin-basic" },
            { id: 4, label: "सामान्य रोकड वही", link: "/NamunaFive_Report" },
            { id: 5, label: "दैनिक रोकड वही", link: "/नमुना-५-अहवाल" }, 

            // Added third item
          ],
        },
        {
          id: "signUp",
          label: "नमुना क्र. ०६ ते १०",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsProfile(!isProfile);
          },
          parentId: "authentication",
          stateVariables: isProfile,
          childItems: [
            { id: 6, label: "जमा रकमांची वर्गिकृत नोंदवही(मासिक)", link: "/नमुना-६-अहवाल" },
            { id: 7, label: "कर आकरणी नोंदवही", link: "/auth-signin-cover" },
            { id: 8, label: "कर मागणी नोंदवही", link: "/नमुना-८-अहवाल" },
            { id: 9, label: "कराची मागणी पावती", link: "/नमुना-९-अहवाल" },
            { id: 10, label: "कर व फी बाबत पावती", link: "/namuna10report1" }, // Added third item
          ],
        },

        {
          id: "signUp",
          label: "नमुना क्र. ११ ते १५",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsProfile(!isProfile);
          },
          parentId: "authentication",
          stateVariables: isProfile,
          childItems: [
            { id: 11, label: "किरकोळ मागणी नोंदवही", link: "/नमुना-११-अहवाल" },
            { id: 12, label: "आकस्मिक खर्च प्रमाणक", link: "/auth-signin-cover" },
            { id: 13, label: "कर्मचारी वर्गाची सूची व वेतनश्रेणी नोंदवही", link: "/नमुना-१३-अहवाल" },
            { id: 14, label: "मुद्रांक हिशोब नोंदवही ", link: "/namuna14mudrankreport" },
            { id: 15, label: "उपभोग्य वस्तूंसाठी नोंदवही", link: "/auth-signin-advanced" }, // Added third item
          ],
        },

        {
          id: "signUp",
          label: "नमुना क्र. १६ ते २०",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsProfile(!isProfile);
          },
          parentId: "authentication",
          stateVariables: isProfile,
          childItems: [
            { id: 16, label: "जड वस्तु संग्रह व जंगल मालमत्ता नोंदवही", link: "/auth-signin-basic" },
            { id: 17, label: "अग्रीम दिलेल्या/अनामत ठेवलेल्या रक्कमांची नोंदवही", link: "/report17" },
            { id: 18, label: "किरकोळ रोकडवही-जमा", link: "/Namuna18Report" },
            { id: 18, label: "किरकोळ रोकडवही-खर्च ", link: "/Namuna18Report2" },
            { id: 19, label: "कामावर असलेल्या व्यक्तीचा हजेरीपट ", link: "/auth-signin-cover" },
            { id: 20, label: "कामाच्या अंदाजाची नोंदवही", link: "/नमुना-२०-अहवाल" }, // Added third item
          ],
        },

        {
          id: "signUp",
          label: "नमुना क्र. २१ ते २५",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsProfile(!isProfile);
          },
          parentId: "authentication",
          stateVariables: isProfile,
          childItems: [
            { id: 21, label: "२१ - मोजमाप वही", link: "/report-details" },
            { id: 22, label: "२२ - स्थावर मालमत्ता नोंदवही(रस्ते व जमीन व्यतिरिक)", link: "/नमुना-२२-अहवाल" },
            { id: 23, label: "२३ - ताब्यातील रस्त्ांची नोंदवही", link: "/नमुना-२३-अहवाल" },
            { id: 24, label: "२४ - जमीनीची नोंदवही", link: "/report-details-24" },
            { id: 25, label: "२५ - गुंतवणूक वही", link: "/नमुना-२५-अहवाल" }, // Added third item
          ],
        },

        {
          id: "signUp",
          label: "नमुना क्र. २६ ते ३१",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsProfile(!isProfile);
          },
          parentId: "authentication",
          stateVariables: isProfile,
          childItems: [
            { id: 26, label: "जमा मासिक विवरण", link: "/auth-signin-basic" },
            { id: 26, label: "खचाच मासिक विवरण ", link: "/नमुना-२६-ख-अहवाल" },
            { id: 27, label: "लेखा परीक्षणातील आक्षेपांच्या मासिक विवरण ", link: "/नमुना-२७-अहवाल" },
            { id: 28, label: "मागासिगीय १५ टक्के महिला बालकल्याण १० टक्के मासिक विवरण नोंदवही", link: "/नमुना-२८-अहवाल" },
            { id: 29, label: "कर्जाची नोंदवही ", link: "/auth-signin-advanced" },
            { id: 30, label: "ग्रामपंचायत लेखा परीक्षण आक्षेप पूतयता नोंदवही", link: "/नमुना-३०-अहवाल" },
            { id: 32, label: "रक्कमेच्या परताव्यासाठीचा आदेश", link: "/नमुना-३२-अहवाल" },
            { id: 33, label: "वृक्ष नोंदवही", link: "/नमुना-३३-अहवाल" },
            // Added third item
          ],
        },
      ],
    },
    {
      id: "Settings",
      label: "Settings",
      icon: "ri-settings-3-line",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Settings");
      },
      subItems: [
        { id: "updateProfile", label: "Update Profile", link: "/Update_Profile", parentId: "settings" },
        { id: "changePassword", label: "Change Password", link: "/Change_Password", parentId: "settings" },
        { id: "changeSetting", label: "Change Settings", link: "/Settings", parentId: "settings" },
      ],
    },
  ];

  return <React.Fragment>{menuItems}</React.Fragment>;
};

export default Navdata;
