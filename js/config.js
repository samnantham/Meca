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
                app.apiurl = "https://mecacampus.com/API/user/";
                app.imageurl = "https://mecacampus.com/API/";
                app.noauthroutes = ['access.signin', 'access.signup', 'access.forgotpwd', 'access.resetpwd'];
                app.pagelimits = [10, 25, 50, 100];
                app.constantlatlong = {
                    lat: '25.0688266',
                    long: '55.1394262',
                    location: '1 Sheikh Mohammed bin Rashid Blvd - Dubai - United Arab Emirates'
                };
                app.imgextensions = ['jpeg', 'png', 'jpg', 'gif'];
                app.maxUploadsize = 1073741824;
                app.maxFilesize = '1024MB';
                app.maxUploadFiles = 25;
                app.validextensions = ['jpeg', 'png', 'jpg', 'gif', '3gp', 'mp4'];
                app.validfileextensions = ['pdf', 'xlsx', 'xls', 'pdf', 'csv', 'doc', 'docx', 'ppt', 'pptx'];

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
                }, {
                    id: 5,
                    type: 'Wall Of Fame'
                }, {
                    id: 6,
                    type: 'Train The Trainer'
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
                }, {
                    id: 4,
                    type: 'BIT Foundation'
                }];

                app.maastypes = [{
                    id: 1,
                    type: 'B2C'
                }, {
                    id: 2,
                    type: 'B2B'
                }];

                app.sdgstypes = [{
                        id: 1,
                        type: 'No Poverty',
                        bgcolor: '#D62530'
                    },
                    {
                        id: 2,
                        type: 'Zero Hunger',
                        bgcolor: '#C89932'
                    },
                    {
                        id: 3,
                        type: 'Good Health and Well Being',
                        bgcolor: '#2C9145'
                    },
                    {
                        id: 4,
                        type: 'Quality Education',
                        bgcolor: '#AF2534'
                    },
                    {
                        id: 5,
                        type: 'Gender Equality',
                        bgcolor: '#DC3E31'
                    },
                    {
                        id: 6,
                        type: 'Clean Water and Sanitation',
                        bgcolor: '#00A4C7'
                    },
                    {
                        id: 7,
                        type: 'Affordable and Clean Energy',
                        bgcolor: '#F2B02A'
                    },
                    {
                        id: 8,
                        type: 'Decent Work and Economic Growth',
                        bgcolor: '#7A1D32'
                    },
                    {
                        id: 9,
                        type: 'Industry Innovation and Infrastructure',
                        bgcolor: '#E2662B'
                    },
                    {
                        id: 10,
                        type: 'Reduced InEqualities',
                        bgcolor: '#CE1F76'
                    },
                    {
                        id: 11,
                        type: 'Sustainable Cities and Communities',
                        bgcolor: '#EB9534'
                    },
                    {
                        id: 12,
                        type: 'Responsible Consumption and Production',
                        bgcolor: '#C38532'
                    },
                    {
                        id: 13,
                        type: 'Climate Action',
                        bgcolor: '#476F3B'
                    },
                    {
                        id: 14,
                        type: 'Life Below Water',
                        bgcolor: '#0074A7'
                    },
                    {
                        id: 15,
                        type: 'Life on Land',
                        bgcolor: '#3DA448'
                    },
                    {
                        id: 16,
                        type: 'Peace Justice and Strong Institutions',
                        bgcolor: '#154C75'
                    },
                    {
                        id: 17,
                        type: 'Partnership for the Goals',
                        bgcolor: '#1F2F53'
                    }
                ];

                app.hydrogentypes = [{
                        id: 1,
                        type: 'Basics Of Hydrogen',
                        label: 'Basics'
                    },
                    {
                        id: 2,
                        type: 'Roadmaps by Country/Region',
                        label: 'Roadmaps'
                    },
                    {
                        id: 3,
                        type: 'Research Papers',
                        label: 'Papers'
                    },
                    {
                        id: 4,
                        type: 'Weblinks for Hydrogen Players',
                        label: 'Weblinks'
                    },
                    {
                        id: 5,
                        type: 'Hydrogen News',
                        label: 'News'
                    }
                ];

                app.newscategories = [{
                    category: 'Company',
                    subcategories: ['Message From Management', 'Vision & Philosophy', 'Profile', 'Trajectory of toyota']
                }, {
                    category: 'Newsroom',
                    subcategories: []
                }, {
                    category: 'Mobility',
                    subcategories: ['CASE', 'TNGA', 'Motorsports']
                }, {
                    category: 'Sustainability',
                    subcategories: ['Environmental Initiatives', 'SDGs Initiatives']
                }, {
                    category: 'IR',
                    subcategories: []
                }, {
                    category: 'Market Latest News',
                    subcategories: []
                }, {
                    category: 'Toyota Latest News',
                    subcategories: []
                }]

                app.tbp_upload_types = [{
                    id: 1,
                    type: 'Step 1',
                    typename: 'step1'
                }, {
                    id: 2,
                    type: 'Step 1 Revised',
                    typename: 'step1_revised'
                }, {
                    id: 3,
                    type: 'Step 1-3',
                    typename: 'step1_3'
                }, {
                    id: 4,
                    type: 'Step 1-3 Revised',
                    typename: 'step1_3_revised'
                }, {
                    id: 5,
                    type: 'Step 1-5',
                    typename: 'step1_5'
                }, {
                    id: 6,
                    type: 'Step 1-5 Revised',
                    typename: 'step1_5_revised'
                }, {
                    id: 7,
                    type: 'Step 1-8',
                    typename: 'step1_8'
                }, {
                    id: 8,
                    type: 'Step 1-8 Revised',
                    typename: 'step1_8_revised'
                }];

                app.pdca_upload_types = [{
                    id: 1,
                    type: 'Step 1',
                    typename: 'step1'
                }, {
                    id: 2,
                    type: 'Step 1 Revised',
                    typename: 'step1_revised'
                }, {
                    id: 3,
                    type: 'Step 1-3',
                    typename: 'step1_3'
                }, {
                    id: 4,
                    type: 'Step 1-3 Revised',
                    typename: 'step1_3_revised'
                }];

                app.newsvideotypes = ['Bahrain', 'Central Asia (Turkmenistan/ Tajikisan/ Uzbekistan)', 'India', 'Iraq', 'Jordan', 'Kuwait', 'Lebanon', 'Oman', 'Others', 'Qatar', 'Saudi Arabia', 'UAE', 'Yemen', 'Mangolia'];

                app.newstags = ['AI', 'Automotive', 'Autonomous', 'Autonomous/Automated', 'Aviation', 'BEV', 'Battery', 'Battery EV', 'Brand', 'CASE', 'CarSharing', 'Case', 'China', 'ConceptCar', 'Connected', 'Connected City', 'Connectivity', 'Consulting', 'Cutting Edge Technology', 'Design', 'Dubai Electricity & Water Authority', 'Electric', 'Electrification', 'Energy', 'Environment', 'Equality', 'Events', 'Expo', 'Fuel Cell', 'Hydrogen', 'Incentives', 'Influencer', 'Infrastructure', 'Innovation', 'Investment', 'JV', 'Japan', 'MaaS', 'Management', 'Mobility', 'Mobility for All', 'Models', 'News Release', 'Olympics-Paralympics', 'Other Products and Services', 'Portugal', 'Practical', 'Presentation', 'President', 'Promoter', 'ProspectPartner', 'ProspectPartners', 'Recycle', 'Region', 'Regulation', 'RegulationBody', 'Robotics', 'SDGs', 'SYI', 'Safety', 'Safety Technology', 'Semiconductors', 'Service', 'Shared', 'Singapore', 'Sky', 'Slogan', 'Smart City', 'Smart Mobility Society', 'Society', 'Software', 'Space', 'Start Up', 'Start Your Impossible', 'StartYourImpossible', 'Strategic Partner', 'Sustainability', 'TPS', 'TRI-AD', 'TRI-P4', 'Team mate', 'Tokyo2020', 'Toyota', 'Toyota Way', 'ToyotaGroup', 'Transformation', 'Tsinghua', 'U.S', 'USA', 'Vehicledevelopment', 'Vision', 'Walking', 'WovenCity', 'Zero Casuality', 'Zero Emission'];

                //app.newstags = ['Case', 'Innovation', 'News Release', 'Shared', 'Management', 'Autonomous/Automated', 'Region', 'Smart Mobility Society', 'Electric', 'Other Products and Services', 'U.S', 'Events', 'Olympics and Paralympics', 'Models', 'Presentation', 'Toyota', 'Safety Technology'];

                app.organizationdocs = [{
                    name: 'Bahrain EKK MEBIT Organization Structure (2020)_ver2',
                    link: 'docs/Organization/Bahrain EKK MEBIT Organization Structure (2020)_ver2.pdf',
                }, {
                    name: 'IRAQ TIQ BIT Organization Structure',
                    link: 'docs/Organization/IRAQ TIQ BIT Organization Structur.pdf'
                }, {
                    name: 'Jordan CTA _ MEBIT Organization Structure - Markazia Jordan (CTA)',
                    link: 'docs/Organization/Jordan CTA _ MEBIT Organization Structure - Markazia Jordan (CTA).pdf'
                }, {
                    name: 'Kuwait MNSS _Copy of 2. MEBIT Organization Structure Template_(completed...',
                    link: 'docs/Organization/Kuwait MNSS _Copy of 2. MEBIT Organization Structure Template_(completed).pdf'
                }, {
                    name: 'Lebanon BUMC _ MEBIT Organization Structure Template_',
                    link: 'docs/Organization/Lebanon BUMC _ MEBIT Organization Structure Template.pdf'
                }, {
                    name: 'MEBIT Organization Structure - SBA',
                    link: 'docs/Organization/MEBIT Organization Structure - SBA.pdf'
                }, {
                    name: 'MEBIT',
                    link: 'docs/Organization/MEBIT.pdf'
                }, {
                    name: 'Qatar AAB_ MEBIT',
                    link: 'docs/Organization/Qatar AAB_ MEBIT.pdf'
                }, {
                    name: 'Saudi ALJ_ 2020  MEBIT Organization Structure ALJ',
                    link: 'docs/Organization/Saudi ALJ_ 2020  MEBIT Organization Structure ALJ.pdf'
                }, {
                    name: 'UAE AFM_ BIT Org Struture Temp',
                    link: 'docs/Organization/UAE AFM_ BIT Org Struture Temp.pdf'
                }, {
                    name: 'Yemen AMTC _ MEBIT Organization Structure Template v2',
                    link: 'docs/Organization/Yemen AMTC _ MEBIT Organization Structure Template v2.pdf'
                }];

                app.organizationList = [{
                    country: 'Saudi Arabia',
                    distributor: '[ALJ] Abdul Latif Jameel Co.',
                    linktoOpen: 'docs/OrganizationChartPDF/(ALJ) 2021  MEBIT Organization Structure.pdf'
                }, {
                    country: 'UAE',
                    distributor: '[AFM] Al-Futtaim Motor Co.',
                    linktoOpen: ''
                }, {
                    country: 'Kuwait',
                    distributor: '[MNSS] Mohamed Naser Al-Sayer & Sons Est Co.',
                    linktoOpen: 'docs/OrganizationChartPDF/(MNSS) 2021 MEBIT Organization Structure.pdf'
                }, {
                    country: 'Iraq',
                    distributor: '[TIQ] Toyota Al Iraq Company for Trading and services of Vehicles Ltd.',
                    linktoOpen: 'docs/OrganizationChartPDF/(TIQ) 2021 MEBIT Organization Chart.pdf'
                }, {
                    country: 'Jordan',
                    distributor: '[CTA] Central Trade & Auto Co.',
                    linktoOpen: 'docs/OrganizationChartPDF/(CTA) MEBIT Organization Structure.pdf'
                }, {
                    country: 'Oman',
                    distributor: '[SBA] Saud Bahwan Automotive LLC.',
                    linktoOpen: 'docs/OrganizationChartPDF/(SBA) 2021 MEBIT Org Structure .pdf'
                }, {
                    country: 'Qatar',
                    distributor: '[AAB] Abdullah Abdulghani & Bros. Co.',
                    linktoOpen: 'docs/OrganizationChartPDF/(AAB) 2021 MEBIT Organization Chart.pdf'
                }, {
                    country: 'Bahrain',
                    distributor: '[EKK]Ebrahim K. Kanoo B.S.C',
                    linktoOpen: 'docs/OrganizationChartPDF/(EKK) 2021 MEBIT Organization Structure.pdf'
                }, {
                    country: 'Lebanon',
                    distributor: '[BUMC] Boustany United Machineries Company s.a.l',
                    linktoOpen: 'docs/OrganizationChartPDF/(BUMC)  - MEBIT Organization Structure.pdf'
                }, {
                    country: 'Yemen',
                    distributor: '[AMTC] Automotive & Machinery Trading Center',
                    linktoOpen: 'docs/OrganizationChartPDF/(AMTC) 2021 MEBIT Organization Structure.pdf'
                }, {
                    country: 'Central Asia',
                    distributor: '[TCA] Toyota Central Asia FZE',
                    linktoOpen: 'docs/OrganizationChartPDF/(TCA)2021 MEBIT-TCA Organization Chart.pdf'
                }, {
                    country: 'Afghanistan',
                    distributor: '[HGML] Habib Gulzar Motors Ltd.',
                    linktoOpen: 'docs/OrganizationChartPDF/(HGML) 2021 MEBIT Organization Chart.pdf'
                }];

                app.mentor_experience_years = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th'];
                app.mentor_batch_medals = ['GOLD（Passed with above 90% score）', 'GOLD（Passed with above 90% score）- Upgraded', 'GOLD（Passed with above 90% score）- Renewed', 'SILVER（Passed with above 80% score）', 'SILVER（Passed with above 80% score）- Upgraded', 'SILVER（Passed with above 80% score）- Renewed', 'Not yet passed the mentor course', ];
                app.mentor_countries = [{
                    lable: 'lbn',
                    country: 'Lebanon'
                }, {
                    lable: 'irq',
                    country: 'Iraq'
                }, {
                    lable: 'jor',
                    country: 'Jordan'
                }, {
                    lable: 'kwt',
                    country: 'Kuwait'
                }, {
                    lable: 'bhr',
                    country: 'Bahrain'
                }, {
                    lable: 'qat',
                    country: 'Qatar'
                }, {
                    lable: 'sau',
                    country: 'Saudi Arabia'
                }, {
                    lable: 'are',
                    country: 'United Arab Emirates'
                }, {
                    lable: 'omn',
                    country: 'Oman'
                }, {
                    lable: 'yem',
                    country: 'Yemen'
                }, {
                    lable: 'uzb',
                    country: 'Uzbekistan'
                }, {
                    lable: 'afg',
                    country: 'Afghanistan'
                }, {
                    lable: 'man',
                    country: 'Mangolia'
                }];
            }

        ])

    .run(['bowser', '$rootScope', function(bowser, $rootScope) {
        $rootScope.browser = bowser.name;
        console.log($rootScope.browser)
        $rootScope.version = bowser.version;
    }])
    .config(function(ScrollBarsProvider) {
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