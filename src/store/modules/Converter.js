/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88" . "88
 **                                                         (| -_- |)
 **                                                          O\ = /O
 **                                                      ____/`---'\____
 **                                                    .   ' \\| |// `.
 **                                                     / \\||| : |||// \
 **                                                   / _||||| -:- |||||- \
 **                                                     | | \\\ - /// | |
 **                                                   | \_| ''\---/'' | |
 **                                                    \ .-\__ `-` ___/-. /
 **                                                 ___`. .' /--.--\ `. . __
 **                                              ."" '< `.___\_<|>_/___.' >'"".
 **                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
 **                                               \ \ `-. \_ __\ /__ _/ .-` / /
 **                                       ======`-.____`-.___\_____/___.-`____.-'======
 **                                                          `=---='
 **
 **                                       .............................................
 **                                              佛祖保佑             永无BUG
 **                                      佛曰:
 **                                              写字楼里写字间，写字间里程序员；
 **                                              程序人员写程序，又拿程序换酒钱。
 **                                              酒醒只在网上坐，酒醉还来网下眠；
 **                                              酒醉酒醒日复日，网上网下年复年。
 **                                              但愿老死电脑间，不愿鞠躬老板前；
 **                                              奔驰宝马贵者趣，公交自行程序员。
 **                                              别人笑我忒疯癫，我笑自己命太贱；
 **                                              不见满街漂亮妹，哪个归得程序员？
 */
import * as types from '../mutation-types'
import { request } from '../../utils/index'

const moduleConverter = {
  namespaced: true,
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // getGroups ({ dispatch }) {
    //   return new Promise(async (resolve, reject) => {
    //     await dispatch('imLoginCheck').then(() => {
    //       IM.getGroups().onSuccess(data => {
    //         resolve(data)
    //       }).onFail(data => {
    //         reject(data)
    //       })
    //     }).catch(err => {
    //       reject(err)
    //       // reject(new Error(err.message))
    //     })
    //   })
    // },
    doConvertFromHttp ({ dispatch }, args) {
      return new Promise(async (resolve, reject) => {
        request({
          url: '/inig/index/doConvert',
          methods: 'get',
          params: args || {}
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(new Error(err.message))
        })
      })
    },
    doConvertFromLocal ({ dispatch }, args) {
      return new Promise(async (resolve, reject) => {
        let fd = new FormData()
        fd.append('file', args['file'])
        let params = []
        for (let k in args) {
          if (args.hasOwnProperty(k) && k !== 'file' && k != 'path') {
            params.push(k + '=' + encodeURIComponent(args[k]))
          }
        }
        request.post('/inig/index/doConvert2?' + params.join('&'), fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(new Error(err.message))
        })
        // request({
        //   url: '/inig/index/doConvert2',
        //   methods: 'post',
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
        //   data: fd
        // }).then(res => {
        //   console.log('=====', res)
        //   resolve(res)
        // }).catch(err => {
        //   reject(new Error(err.message))
        // })
      })
    }
  }
}

export default moduleConverter
