var sum_to_n_a = function(n) {
    // Naive method
    let sum=0;
    for(let i=1;i<=n;i++){
        sum+=i;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    // Fastest O(1)
    // Arithmetic Sum
    return (n/2)*(2+(n-1));
};

var sum_to_n_c = function(n) {
    // Recursion
    // Extremely sus
    // Start from the back
    let arr = new Array(n).fill(0);
    for(let i=n;i>=0;i--){
        if(i==0){
            arr[0] = 0;
        }else{
            arr[i] = sum_to_n_c(i-1)+i;
        }
    }
    return arr[n];
};

// let a = sum_to_n_a(20);
// let b = sum_to_n_b(20);
// let c = sum_to_n_c(20);
// console.log(a);
// console.log(b);
// console.log(c);