({
    doInit : function(component, event, helper) {
        var action = component.get("c.getContents");
        action.setParams({ conId : component.get("v.recordId") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(component.isValid() && state === 'SUCCESS') {
                component.set("v.contentId", response.getReturnValue());
            }
        });
        //console.log(component.get("v.contentId"));
        $A.enqueueAction(action);
    },

    handleExit : function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    },

    handleNext : function(component, event, helper) {
        //$A.get("e.force:closeQuickAction").fire();
        component.set("v.Main", false);

        component.set("v.Next", true);

    },

    previousModal : function(component, event, helper) {
        component.set("v.Next", false);
        component.set("v.Main", true);
    },

    handleSend : function(component, event, helper) {
        var action = component.get("c.sendEmail");
        var emailList = [];
        var getEmailIds = component.get("v.emailList");
        for(var i = 0; i<getEmailIds.length; i++){
            emailList.push(getEmailIds[i].Email);
            
        }
        console.log(emailList);
        //console.log(component.find("emailAuraId").get('v.value'));
        action.setParams({ conId : component.get("v.recordId"),
                          emailAddress : emailList });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(component.isValid() && state === 'SUCCESS') {
                console.log('limit?');
                $A.get("e.force:closeQuickAction").fire();
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type": "Success",
                    "title": "Success!",
                    "message": "The pdf has been mailed successfully."
                });
                toastEvent.fire();
            }
        });
        console.log('limit?outer');
        $A.enqueueAction(action);
    },

    addRow : function(component, event, helper) {
        var emailList = component.get("v.emailList");
        //Add New Account Record
        emailList.push({
            'Email':'',
            
        });
        component.set("v.emailList", emailList);
        console.log(component.get("v.emailList"));
    },
})
