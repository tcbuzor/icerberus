public class WhatExpr implements AST {

    String what;

    public WhatExpr(String what) {
        this.what = what;
    }

    @Override
    public String toString(int pos) {
        return Utility.getTabs(pos) + "what:" + what + ",";
    }
}
