//处理博客相关的路由
const { SuccessModel, ErrModel} = require('../model/responseModel');



const {geBlogtList,getBlogDetail,createNewBlog,updateBlog,deleteBlog} = require('../controllers/blog');


const handleBlogRoute = (req,res)=>{
    //定义处理路由的逻辑
   const method = req.method;

   const path = req.path;

   const id = req.query.id;

   const blogData = req.body;

    

    if(method === 'GET' && path === '/api/blog/list'){

      
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listDataPromise = geBlogtList(author,keyword);
        return listDataPromise.then(listData=>{
            return new SuccessModel(listData);
        });
        
       
    }

    
    if(method === 'GET' && path ==='/api/blog/detail'){
        
       
        const detailDataPromise = getBlogDetail(id);
       return detailDataPromise.then(detailData=>{
            return new SuccessModel(detailData);
        });
      
    }

    
    if(method === 'POST' && path === '/api/blog/new'){
        
        // const newBlogData = createNewBlog(blogData);
        // return new SuccessModel(newBlogData);
        const author = 'zhangsan';
        req.body.author = author;

        const newBlogDataPromise = createNewBlog(blogData);
        return newBlogDataPromise.then(newBlogData=>{
            return new SuccessModel(newBlogData);
        });
    }

    
    if(method === 'POST' && path === '/api/blog/update'){
        const updatedBlogDataPromise = updateBlog(id,blogData)

        return updatedBlogDataPromise.then(updatedBlogData=>{
            if(updatedBlogData){
                return new SuccessModel('更新博客成功');
            }else{
                return new ErrModel('更新博客失败');
            }


        })
       
        
    }


    
    if(method === 'POST' && path === '/api/blog/delete'){
        const author = 'zhangsan';
        const deleteBlogDataPromise = deleteBlog(id,author);
       return deleteBlogDataPromise.then(deleteBlogData=>{
            if(deleteBlogData){
                return new SuccessModel('删除博客成功');
            }else{
                return new ErrModel('更删除博客失败');
            }

        })
      
       
    }


};


module.exports = handleBlogRoute;