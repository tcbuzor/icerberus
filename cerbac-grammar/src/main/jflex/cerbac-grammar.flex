/*-***
 * This grammar is defined for the Cerbac Project
 */

/*
 * NOTE: make sure that the java cup runtime file is in the same directory as this file
 * it is also alright if the runtime location is added to to the classpath, but just
 * putting in the same file is far easier.
 */
import java_cup.runtime.*;


%%
/*-*
 * LEXICAL FUNCTIONS:
 */
%public
%cup
%line
%column
%unicode
%class CerbacLexer

%{

  StringBuffer string = new StringBuffer();


  Symbol newSym(int tokenId) {
      return new Symbol(tokenId, yyline, yycolumn);
  }

  Symbol newSym(int tokenId, Object value) {
      return new Symbol(tokenId, yyline, yycolumn, value);
  }



%}



/*-*
 * PATTERN DEFINITIONS:
 */


tab				= \\t
newline			= \\n
slash			= \\
escapeapos		= {slash}'
escapequote		= {slash}\"
letter      	= [A-Za-z]
digit       	= [0-9]
id   			= {letter}({letter}|{digit})*
intlit	    	= {digit}+
floatlit    	= {intlit}+\.{intlit}+
charchar		= [[^\\]&&[^']]|{newline}|{tab}|{escapeapos}|{slash}{slash}
charlit     	= '{charchar}'
stringchar		= [[[^\\]&&[^\"]]&&[[^\n]&&[^\t]]]|{newline}|{tab}|{escapequote}|{slash}{slash}
stringlit		= \"{stringchar}*\"
blockcomments   = {slash}\*
blockcommente   = \*{slash}
commentbody		= ([^\*]|(\*+[^\\]))
blockcomment    = {blockcomments}{commentbody}*?{blockcommente}
inlinecomment 	= {slash}{slash}.*(\n|\r|\r\n)
whitespace      = [ \n\t\r]
newLine         = [\r|\n|\r\n]



%%
/**
 * LEXICAL RULES:
 */

"&&"            { return newSym(sym.AND, "&&"); }
read		    { return newSym(sym.READ, "read"); }
print		    { return newSym(sym.PRINT, "print"); }
printline	    { return newSym(sym.PRINTLN, "printline"); }
return		    { return newSym(sym.RETURN, "return"); }
"||"            { return newSym(sym.OR, "||"); }
"*"             { return newSym(sym.TIMES, "*"); }
"+"             { return newSym(sym.PLUS, "+"); }
//"+" 		    { return newSym(sym.PREFIXPLUS, "+"); }
"++"		    { return newSym(sym.PLUSPLUS, "++"); }
"-"             { return newSym(sym.MINUS, "-"); }
"--"		    { return newSym(sym.MINUSMINUS, "--"); }
"/"             { return newSym(sym.DIVIDE, "/"); }
";"             { return newSym(sym.SEMI, ";"); }
"("             { return newSym(sym.LEFT_PAREN, "("); }
")"             { return newSym(sym.RT_PAREN, ")"); }
"{"		        { return newSym(sym.LEFT_BRACE, "{"); }
"}"		        { return newSym(sym.RT_BRACE, "}"); }
"["             { return newSym(sym.LEFT_BRKT, "["); }
"]"             { return newSym(sym.RT_BRKT, "]"); }
"=="            { return newSym(sym.EQEQ, "=="); }
">"             { return newSym(sym.GTR, ">"); }
"<"             { return newSym(sym.LESS, "<"); }
"<="            { return newSym(sym.LESS_EQ, "<="); }
">="            { return newSym(sym.GTR_EQ, ">="); }
"<>"            { return newSym(sym.NOT_EQ, "<>"); }
"~"		        { return newSym(sym.NOT, "?"); }
"?"		        { return newSym(sym.CONDITION, "?"); }
":"             { return newSym(sym.COLON, ":"); }
"="             { return newSym(sym.ASSMNT, "="); }
","		        { return newSym(sym.COMMA, ","); }
var		        { return newSym(sym.VAR, "var"); }
final 		    { return newSym(sym.FINAL, "final"); }
void		    { return newSym(sym.VOID, "void"); }
int		        { return newSym(sym.INT, "int"); }
float		    { return newSym(sym.FLOAT, "float"); }
bool		    { return newSym(sym.BOOL, "bool"); }
char		    { return newSym(sym.CHAR, "char"); }
true		    { return newSym(sym.TRUE, "true"); }
false		    { return newSym(sym.FALSE, "false"); }
aplus		    { return newSym(sym.AUTH_PLUS, "aplus"); }
aminus		    { return newSym(sym.AUTH_MINUS, "aminus"); }
oplus		    { return newSym(sym.OBLIG_PLUS, "oplus"); }
ominus		    { return newSym(sym.OBLIG_MINUS, "ominus"); }
who		        { return newSym(sym.WHO, "who"); }
what		    { return newSym(sym.WHAT, "what"); }
where		    { return newSym(sym.WHERE, "where"); }
why		        { return newSym(sym.WHY, "why"); }
when		    { return newSym(sym.WHEN, "when"); }
how		        { return newSym(sym.HOW, "how"); }
type		    { return newSym(sym.POLICY_TYPE, "type"); }
action		    { return newSym(sym.ACTION, "action"); }
origin		    { return newSym(sym.ORIGIN, "origin"); }
target		    { return newSym(sym.TARGET, "target"); }
provider		{ return newSym(sym.PROVIDER, "provider"); }
service		    { return newSym(sym.SERVICE, "service"); }
data		    { return newSym(sym.DATA, "data"); }
policy          { return newSym(sym.POLICY_STATEMENT, "policy"); }
statements      { return newSym(sym.STATEMENTS, "statements"); }
trigger        { return newSym(sym.TRIGGER, "trigger"); }
pid             { return newSym(sym.POLICY_ID, "pid"); }
sid             { return newSym(sym.STATEMENT_ID, "sid"); }
{id}    	    { return newSym(sym.ID, yytext()); }
{intlit}        { return newSym(sym.INTLIT, new Integer(yytext())); }
{floatlit}      { return newSym(sym.FLOATLIT, new Double(yytext())); }
{charlit}       { return newSym(sym.CHARLIT, yytext()); }
{stringlit}	    { return newSym(sym.STRINGLIT, yytext()); }
{inlinecomment} { /* For this stand-alone lexer, print out comments. */}
{blockcomment}	{ /* For this stand-alone lexer, print out comments. */}
{whitespace}    { /* Ignore whitespace. */ }
.               { System.out.println("Illegal char, '" + yytext() +
                    "' line: " + yyline + ", column: " + yychar); }
