import java.util.List;

public class PolicyExpr implements AST {
    PolicyType pType;
    WhoExpr whoExpr;
    List<PolicyAction> policyActions;
    WhatExpr whatExpr;
    OptionalTriggerExpr triggerExpr;
    OptionalWhyExpr whyExpr;
    OptionalHowExpr howExpr;
    OptionalWhenExpr whenExpr;
    OptionalWhereExpr whereExpr;

    public PolicyExpr(PolicyType pType, WhoExpr whoExpr, List<PolicyAction> policyActions,
                      WhatExpr whatExpr, OptionalTriggerExpr triggerExpr, OptionalWhyExpr whyExpr,
                      OptionalHowExpr howExpr, OptionalWhenExpr whenExpr, OptionalWhereExpr whereExpr) {
        this.pType = pType;
        this.whoExpr = whoExpr;
        this.policyActions = policyActions;
        this.whatExpr = whatExpr;
        this.triggerExpr = triggerExpr;
        this.whyExpr = whyExpr;
        this.howExpr = howExpr;
        this.whenExpr = whenExpr;
        this.whereExpr = whereExpr;
        System.out.println("whoExpr:" + whoExpr.who);
    }

    @Override
    public String toString(int pos) {
        String tabs = Utility.getTabs(pos+1);
        StringBuffer sb = new StringBuffer();
        sb.append(pType.toString(pos+1)).append("\n");
        sb.append(whoExpr.toString(pos+1)).append("\n");

        StringBuffer ab = new StringBuffer();
//        for(PolicyAction a: policyActions) {
//            ab.append(a.toString(0));
//        }
        int size = policyActions.size();
        for (int i = 0; i < size;i++){
            ab.append(policyActions.get(i).toString(0));
            if (i + 1 < size) {
                ab.append(",");
            }

        }


        sb.append(tabs + "action: [" + ab.toString() + "],").append("\n");
        sb.append(whatExpr.toString(pos+1)).append("\n");
        if(triggerExpr != null) {
            sb.append(triggerExpr.toString(pos+1)).append("\n");
        }
        if(whyExpr != null) {
            sb.append(whyExpr.toString(pos+1)).append("\n");
        }
        if(howExpr != null) {
            sb.append(howExpr.toString(pos+1)).append("\n");
        }
        if(whenExpr != null) {
            sb.append(whenExpr.toString(pos+1)).append("\n");
        }
        if(whereExpr != null) {
            sb.append(whereExpr.toString(pos+1)).append("\n");
        }
        return sb.toString();
    }
}
