function add(a,b)
{
    return a+b;
}
function sub(a,b)
{
    return a-b;
}
function mult(a,b)
{
    return a*b;
}
function div(a,b)
{
    if(b==0)
    {
        console.log("Infinity");
    }
    else
    {
        return a/b;
    }
}
module.exports={add,sub,mult,div};