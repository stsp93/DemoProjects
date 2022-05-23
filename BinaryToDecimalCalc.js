function binaryToDecimal(stringNum) {
    
    const splitNum = stringNum.split('.');
    const afterDec = splitNum[0];
    const beforeDec = splitNum[1];

    let iterationAfter = 0;
    let iterationBefore = 1;
    let decimalNum = 0;

    for(let i = afterDec.length - 1; i >= 0; i--){
        decimalNum += Number(afterDec[i]) * (2** iterationAfter);
        iterationAfter++;
    }
    for(let i = 0; i < beforeDec.length; i++){
        decimalNum += Number(beforeDec[i]) * (2** (-1 * iterationBefore));
        iterationBefore++;
    }



    return decimalNum;
}