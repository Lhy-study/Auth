/** 后端统一返回基本·格式 */
export type ResponseParams<D={}>= {
    code:number;
    msg:string;
    data:D;
    success:boolean
}

/** 响应基本实例 */
export class ContainerBaseEntity<D>{
    success:boolean;
    message:string;
    code:number;
    data:D|null;
    constructor(res:ResponseParams<D>){
        this.success = res.success || false;
        this.message = res.msg || '404 not found';
        this.code = res.code || 404;
        this.data = res.data || null
    }
}