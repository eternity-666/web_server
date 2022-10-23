//博客相关的方法
const { execSQL } = require('../db/mysql')
//获取博客列表数据
const geBlogtList = (author,keyword)=>{
    //从数据库里拿这个数据
   let sql = `select * from blogs where 1=1 `;
   if(author){
    sql+=`and author='${author}' `;
   }
   if(keyword){
    sql+=`and title like '%${keyword}%'`;
   }

   return execSQL(sql);
    //先返回假数据
    // return [
    //     {
    //         id:1,
    //         title:'标题1',
    //         content:'内容1',
    //         author:'张三',
    //         createdAt:'161'
    //     },
    //     {
    //         id:2,
    //         title:'标题2',
    //         content:'内容2',
    //         author:'李四',
    //         createdAt:'182'
    //     },
    // ]


}
//获取博客详情数据
const getBlogDetail = (id) =>{

    const sql = `select * from blogs where id='${id}'`;
   return execSQL(sql).then(rows =>{
       
        return rows[0];
    });
  
}
//创建博客
const createNewBlog = (blogData={})=>{
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createdAt =Date.now();

    const sql = `
        insert into blogs (title,author,content,createdAt) values ('${title}','${author}','${content}',${createdAt});

    `
    return execSQL(sql).then(insertedResult=>{
        console.log('insertedResult',insertedResult);
            return {
                id:insertedResult.insertId

            }
    });



   
    // return {
    //     id:1
    // }
}

const updateBlog = (id,blogData={})=>{
    const title = blogData.title;
    const content = blogData.content;

    const sql = `update blogs set title='${title}',content='${content}' where id=${id};`
    return execSQL(sql).then(updateResult=>{
        console.log('updateResult',updateResult);
        if(updateResult.affectedRows > 0){
            return true;
        }
        return false;
    })
    // console.log('id',id);
    // console.log('blogData',blogData);


    // return true;
}

const deleteBlog = (id,author)=>{
    const sql = `delete from blogs where id=${id} and auhor='${author}'`;
    return execSQL(sql).then(deleteResult=>{
        console.log('deleteResult',deleteResult);
        if(deleteResult.affectedRows > 0){
            return true;
        }
        return false;
    })
    // console.log('id',id);

    // return true;
}



module.exports = {
    geBlogtList,
    getBlogDetail,
    createNewBlog,
    updateBlog,
    deleteBlog
}