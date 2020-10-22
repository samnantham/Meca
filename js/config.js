// config
var app =
    angular.module('app')
    .config(
        ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function($controllerProvider, $compileProvider, $filterProvider, $provide) {

                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
                app.constant = $provide.constant;
                app.value = $provide.value;
                app.apiurl = "https://mebitcampus.com/API/user/";
                app.imageurl = "https://mebitcampus.com/API/";
                app.noauthroutes = ['access.signin','access.signup','access.forgotpwd','access.resetpwd'];
                app.pagelimits = [10, 25, 50, 100];
                app.constantlatlong = {lat:'25.0688266',long:'55.1394262',location:'1 Sheikh Mohammed bin Rashid Blvd - Dubai - United Arab Emirates'};
                app.imgextensions = ['jpeg', 'png', 'jpg', 'gif'];
                app.maxUploadsize = 1073741824;
                app.maxFilesize = '1024MB';
                app.maxUploadFiles = 15;
                app.validextensions = ['jpeg', 'png', 'jpg', 'gif', '3gp', 'mp4'];
                app.validfileextensions = ['pdf', 'xls', 'pdf', 'csv', 'doc', 'docx'];

                app.eventtypes = [{
                    id: 1,
                    type: 'TBP'
                }, {
                    id: 2,
                    type: 'Workshop'
                }, {
                    id: 3,
                    type: 'Seminar'
                }, {
                    id: 4,
                    type: 'HR'
                }, {
                    id: 5,
                    type: 'Others'
                }];

                app.tbptypes = [{
                    id: 1,
                    type: 'DMDP'
                }, {
                    id: 2,
                    type: 'Mentor'
                }, {
                    id: 3,
                    type: 'Crash'
                }, {
                    id: 4,
                    type: 'PDCA'
                }];

                app.kaizentypes = [{
                    id: 1,
                    type: 'New Car Sales'
                }, {
                    id: 2,
                    type: 'After Sales'
                }, {
                    id: 3,
                    type: 'Trade In'
                },{
                    id: 4,
                    type: 'BIT Foundation'
                }/*,{
                    id: 5,
                    type: 'News Room'
                }*/];

                app.tbp_upload_types = [{
                    id: 1,
                    type: 'Step 1',
                    typename:'step1'
                }, {
                    id: 2,
                    type: 'Step 1 Revised',
                    typename:'step1_revised'
                }, {
                    id: 3,
                    type: 'Step 1-3',
                    typename:'step1_3'
                },{
                    id: 4,
                    type: 'Step 1-3 Revised',
                    typename:'step1_3_revised'
                },{
                    id: 5,
                    type: 'Step 1-5',
                    typename:'step1_5'
                }, {
                    id: 6,
                    type: 'Step 1-5 Revised',
                    typename:'step1_5_revised'
                }, {
                    id: 7,
                    type: 'Step 1-8',
                    typename:'step1_8'
                },{
                    id: 8,
                    type: 'Step 1-8 Revised',
                    typename:'step1_8_revised'
                }];

                app.pdca_upload_types = [{
                    id: 1,
                    type: 'Step 1',
                    typename:'step1'
                }, {
                    id: 2,
                    type: 'Step 1 Revised',
                    typename:'step1_revised'
                }, {
                    id: 3,
                    type: 'Step 1-3',
                    typename:'step1_3'
                },{
                    id: 4,
                    type: 'Step 1-3 Revised',
                    typename:'step1_3_revised'
                }];

                app.organizationdocs = [{
                    name:'Bahrain EKK MEBIT Organization Structure (2020)_ver2',
                    link:'docs/Organization/Bahrain EKK MEBIT Organization Structure (2020)_ver2.pdf',
                },{
                    name:'IRAQ TIQ BIT Organization Structure',
                    link:'docs/Organization/IRAQ TIQ BIT Organization Structur.pdf'
                },{
                    name:'Jordan CTA _ MEBIT Organization Structure - Markazia Jordan (CTA)',
                    link:'docs/Organization/Jordan CTA _ MEBIT Organization Structure - Markazia Jordan (CTA).pdf'
                },{
                    name:'Kuwait MNSS _Copy of 2. MEBIT Organization Structure Template_(completed...',
                    link:'docs/Organization/Kuwait MNSS _Copy of 2. MEBIT Organization Structure Template_(completed).pdf'
                },{
                    name:'Lebanon BUMC _ MEBIT Organization Structure Template_',
                    link:'docs/Organization/Lebanon BUMC _ MEBIT Organization Structure Template.pdf'
                },{
                    name:'MEBIT Organization Structure - SBA',
                    link:'docs/Organization/MEBIT Organization Structure - SBA.pdf'
                },{
                    name:'MEBIT',
                    link:'docs/Organization/MEBIT.pdf'
                },{
                    name:'Qatar AAB_ MEBIT',
                    link:'docs/Organization/Qatar AAB_ MEBIT.pdf'
                },{
                    name:'Saudi ALJ_ 2020  MEBIT Organization Structure ALJ',
                    link:'docs/Organization/Saudi ALJ_ 2020  MEBIT Organization Structure ALJ.pdf'
                },{
                    name:'UAE AFM_ BIT Org Struture Temp',
                    link:'docs/Organization/UAE AFM_ BIT Org Struture Temp.pdf'
                },{
                    name:'Yemen AMTC _ MEBIT Organization Structure Template v2',
                    link:'docs/Organization/Yemen AMTC _ MEBIT Organization Structure Template v2.pdf'
                }];
            }

        ]).config(function (ScrollBarsProvider) {
            ScrollBarsProvider.defaults = {
                scrollButtons: {
                    scrollAmount: 'auto', // scroll amount when button pressed
                    enable: true // enable scrolling buttons by default
                },
                axis: 'y',
                scrollInertia: 800, // enable 2 axis scrollbars by default
            };
        })
        var firebaseConfig = {
            apiKey: "AIzaSyC7RGp_m2veGMkx45dYXCtF3zZQdhifR14",
            authDomain: "toyotamebit.firebaseapp.com",
            databaseURL: "https://toyotamebit.firebaseio.com",
            projectId: "toyotamebit",
            storageBucket: "toyotamebit.appspot.com",
            messagingSenderId: "773088280208",
            appId: "1:773088280208:web:ccce0591dae7c25e902215",
            measurementId: "G-E55C5BHMBH"
        }
        firebase.initializeApp(firebaseConfig);