let add = (a,b) =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (typeof a != 'number' || typeof b != 'number') reject(new Error('2 so phai la kieu number'))
            resolve(a+b)
        },1000)
    })
}
let multi = (a,b) =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (typeof a != 'number' || typeof b != 'number') reject(new Error('2 so phai la kieu number'))
            resolve(a*b)
        },1000)
    })
}
add('4',5).then(res => add(res,6)).then((res)=>console.log(res)).catch(e => console.log(e + ''))