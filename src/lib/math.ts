// simple helpers to unit-test without touching the app
export function sum(a:number,b:number){ return a+b }
export function clamp(x:number,min:number,max:number){
  if(min>max) throw new Error('min>max')
  return Math.max(min, Math.min(max, x))
}
