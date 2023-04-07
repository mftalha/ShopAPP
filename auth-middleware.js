//node ile jwt işlemleri için. : token işlemleri : bir backend dili lazım ondan node js kullanıcaz.
// package.json içine eklediğimiz : jsonwebtoken kütüphanesi sayesinde yapıyoruz :
// web sitesi : https://jwt.io/  == fakrlı web sitelerine göre token alma işlemi var.
// token alma mantığı biz login olduğumuzda : bizim verdiğimiz veriler ile : mesela : username , pass , auth = ile sha254 veya başlka bir şifreleme yöntemi ile bizim belirlediğimiz bir benzersiz token oluşturuyor. : şifreleme alg yanında bir de type var.
// = yani token'ın mantığı bizim verdiğimiz verileri bizim belirlediğimiz şifreleme yöntemi ile encode işlemi yapıp benzersiz bir karekter yığını döndürüyor bize.

//jsonwebtoken
const jwt = require('jsonwebtoken'); // kütüphanaden bir referans alalım

//tokenin geçerliliğini kontrol edeceğimiz string değerler yazıyoruz.
const app_secret = "myappsecret"; 
const username = "admin";
const password = "secret";

// her requesstte karşılayacak fonksiyon.
module.exports = function(req, res, next){

    //Kullanıcı login ile bir post işlemi yapıp yapmadığına bakıyoruz.
    if(req.url === '/login' && req.method == 'POST'){
        //kullanıcıdan gelen usurname ve password bilgilerini kontrol ediyoruz : doğrumu değilmi.
        if(req.body.username === username && req.body.password === password){
            //bir token alıyoruz : içine usurname veriyoruz ve 1 saat tutulacağını belirtiyoruz token'ın ==  burada token üretiliyor
            let token = jwt.sign({data: username, expiresIn:'1h'}, app_secret);
            //body içine ürettiğimiz token'ı gönderiyoruz.
            res.json({success: true, token: token});
        }else{
            // kullanıcının login bilgileri yanlış ise body içine false veriyoruz.
            res.json({success: false})
        }
        //responsı end diyerek sonlandıralım. = ve kullanıcıya response gönderilsin.
        res.end();
        // aşşağıdaki kodlar işletilmesin işlemimiz bitince
        return;
    }else{ // login , post işlemi değilde başka bir işlem geldi ise : (product , post) , (caregory , pıst) işlemleri gibi mesela.
        // products ve categories sayfalarındaki : get hariçi ciğer api işlemlerini burası karşılasın.
        if((req.url.startsWith("/products") || req.url.startsWith("/categories")) && (req.method != 'GET')) {
            // zaten token mevcut login esnasından o token'ı alıyoruz.
            let token = req.headers['authorization']; 
            //token null değilse ve Bearer ile başlıyor ise : Bearer ile başlaması gerekiyor token'ının : token mevcutmu değilmi kontrolü.
            if(token != null && token.startsWith('Bearer<')){
                // Bearer< kısmını almamak için 7. karekterden başlıyarak token'ı alıyorum.
                token = token.substring(7,token.length-1); //-1 deme kısmımda '>' karekterini kaldırmak
                try{
                    //token'ının doğruluğunu kontrol ediyoruz. = başta verdiğimiz(token oluştururken) app_secret string değeri ile gelen app_secret string değeri aynı olması gerekiyor.
                    jwt.verify(token, app_secret);
                    //bir problem yok ise kaldığı yerden middleware'ye devam et diyoruz.
                    next();
                    //kodların aşşağıya devam etmesini önlemek için return diyoruz
                    return;
                }catch(err){
                    // hata var ise burada yazdırabiliriz.
                }
            }
            //eğerki token bilgisi yok ise statusCode'a hata kodunu yazdıyoruz.
            res.statusCode = 401;
            //respons'ı sonlandırıp kullancıya responsa döndürüyoruz : süreci devam ettirerek : sonuçta middleware bir süreç.
            res.end();
            // kod blogunu bitiriyoruz.
            return;
        }
    }
    //middleware bir süreç olduğu için herhangi bir kontrol yapmasamda(login veya sorgulama) : if lere girmesemde sen yoluna devam et demek için next diyorum.
    next();
}