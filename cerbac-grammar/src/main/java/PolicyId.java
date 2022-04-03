public class PolicyId implements AST {
    String id;

    public PolicyId(String id) {
        this.id = id;

    }
    
    @Override
    public String toString(int pos) {
        return Utility.getTabs(pos) + "pid:" + id + ",";
    }
}
