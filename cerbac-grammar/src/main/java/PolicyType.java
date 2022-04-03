public class PolicyType implements AST {
    String id;

    public PolicyType(String id) {
        this.id = id;

    }
    
    @Override
    public String toString(int pos) {
        return Utility.getTabs(pos) + "type:" + id + ",";
    }
}
