if((function() { return !this; })()){
    console.error('"Use Strict" was used inside global scope! Please move all "Use Strict" declarations to inside functions to protect non-strict compliant code from breaking!')
}

var App = {};