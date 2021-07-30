

function findInsertionPoint (sortedArr:Array<number> ,val:number){

    function numComparator(val1:number,val2:number){
        return val1 - val2;
    }
    let n = sortedArr.length
    let low=0, high = n
    let mid=-1,c=0
    while(low < high){
        mid = Math.floor((low+high)/2)
        c = numComparator(sortedArr[mid],val);
        if(c<0){
            low = mid + 1;
        }
        else if(c>0){
            high = mid;
        }
        else{
            console.log('find item')
            return [mid,false]
        }
        console.log("mid=" + mid + ", c=" + c + ", low=" + low + ", high=" + high);
    }

    console.log('can insert item')
    return [low,true];

}

export { findInsertionPoint }