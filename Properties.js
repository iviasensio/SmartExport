define([], function () {
    return {
        type: "items",
        component: "accordion",
        items: {            
            settings: {
                uses: "settings",
                items: {
                    Options: {
                        label: "Settings",
                        type: "items",
                        items: {
                            TitleBool : {
                                ref : "titlebool",
                                type : "boolean",
                                component : "switch",
                                label : "Add title detail",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: true                                
                            },
                            SubtitleBool : {
                                ref : "subtitlebool",
                                type : "boolean",
                                component : "switch",
                                label : "Add subtitle detail",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: true,
                                show : function(data) {
                                    return data.titlebool;
                                }                              
                            },
                            FooterBool : {
                                ref : "footerbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add footer detail",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: true                                
                            },
                            SelectionsBool : {
                                ref : "selectionsbool",
                                type : "boolean",
                                component : "switch",
                                label : "Add current selections",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: true                                
                            },
                            IconBackground: {
                                ref: "iconbackground",
                                label: "Icon background",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: "#7b7a78"  
                                }                                
                            },
                            IconColor: {
                                ref: "iconcolor",
                                label: "Icon color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: "#FFF"  
                                }                                
                            }
                        }                         
                    },
                    about: {
                        component: "items",
                        label: "About",
                        items: {
                            header: {
                                label: "SmartExport Extension",
                                style: "header",
                                component: "text"
                            },
                            paragraph1: {
                                label: "SmartExport extension is deployed to allow a right data export preserving the whole look&feel.",
                                component: "text"
                            },
                            paragraph2: {
                                label: "SmartExport is an extension created by Ivan Felipe, offered under MIT License.",
                                component: "text"
                            }
                        }
                    }
                }
            }            
        }
    }
});