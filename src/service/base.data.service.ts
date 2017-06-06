/**
 * Created by xkfeng on 2017/4/20.
 */
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, URLSearchParams, Request} from "@angular/http";
@Injectable()
export class BaseDataService{
  //https://testbackend.goodaa.com.cn
  baseUrl="/ejiazi-backend/";
  constructor(public http:Http){

  }

  /**
   * 查询配置参数
   * @param param
   * @returns {Observable<Response>} 可观察的响应对象 请订阅这个响应对象
   */
  listData(param:any){
    if(param==null) return;
    console.log("param",param)
    var heraders=new Headers();
    var option=new RequestOptions();
    option.headers=param.headers||heraders;
    option.body=param.param;
    var searchParam=new URLSearchParams();
    for(let key in param.param){
      param.param[key]=param.param[key]==undefined?null:param.param[key];
    }

    let params=new RequestOptions();
    params.search=searchParam;
    if(param.url=="login"){
      params.body=this.obj2queryString(param.param)
    }else{
      params.body=param.param;
    }
    params.headers=param.headers||heraders;
    params.method=param.httpMethod||'post';
    params.url=(param.baseUrl||this.baseUrl)+param.url;
    let request=new Request(params);
    return params.method=="post"?this.http.request(request,params):this.http.get(params.url+"?"+this.obj2queryString(option.body),option);
  }

  /**
   * js对象转查询字符串
   * @param obj 被转对象
   * @returns {string}
   */
  obj2queryString(obj:any){
    let queryString="";
    if(obj){
      let isNotFirst:boolean=false;
      for(let key in obj){
        if(obj[key]!=null){
          if(isNotFirst){
            queryString+="&"
          }
          queryString+=key+"="+obj[key];
          isNotFirst=true;
        }
      }
    }
    return queryString;
  }
}
