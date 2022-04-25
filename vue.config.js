// var dirNameArray
// if(__dirname.indexOf('\\')!=-1){
//     dirNameArray = __dirname.split('\\');
// }else if(__dirname.indexOf('/')!=-1){
//     dirNameArray = __dirname.split('/');
// }


module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/catch-movie/'  : '/',
  // outputDir: dirNameArray[dirNameArray.length-1]
}