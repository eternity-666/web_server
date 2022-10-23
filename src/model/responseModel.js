class BaseModel{
    constructor(data,message){

        if(typeof data === 'string'){
            this.mesage = data;

            data = null;
            message = null;
        }

        if(data){
            this.data = data;
        }

        if(message){
            this.message = message;
        }
    }
}


//成功模型

class SuccessModel extends BaseModel{
    constructor(data,message){
        super(data,message);
        this.errno = 0;
    }
}


//失败模型
class ErrModel extends BaseModel{
    constructor(data,message){
        super(data,message);
        this.errno = -1;
    }
}


module.exports = {
    SuccessModel,
    ErrModel
}