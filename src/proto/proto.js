/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  pb: {
    nested: {
      EC_Code: {
        values: {
          EC_None: 0,
          EC_HeartCheck_GC: 20000,
          EC_MsgNotify_GC: 20001,
          EC_WXLoginRegister_CG: 20002,
          EC_WXLoginByOpenID_CG: 20003,
          EC_WXSession_GC: 20004,
          EC_UserAddInfo_CG: 20005,
          EC_UserAddInfo_GC: 20006,
          EC_WXPhoneDataDecodeBind_CG: 20007,
          EC_WXPhoneDataDecodeBindResult_GC: 20008,
          EC_WXUserInfoSet_CG: 20009,
          EC_WXUserInfoSetResult_GC: 20010,
          EC_FetchMapStoreName_CG: 20011,
          EC_MapStoreNameResult_GC: 20012,
          EC_FetchMapStoreDetail_CG: 20013,
          EC_MapStoreDetailInfo_GC: 20014,
          EC_FtechMapStoreUpdate_CG: 20015,
          EC_MapStoreUpdate_GC: 20016,
          EC_FetchAnnouncementDetailInfo_CG: 20017,
          EC_FetchAnnouncementDetailInfoResult_GC: 20018,
          EC_FetchAnnouncementInfos_CG: 20019,
          EC_AnnouncementInfos_GC: 20020,
          EC_FetchAllClientSignforms_CG: 20021,
          EC_FetchAllClientSignformsResult_GC: 20022,
          EC_FetchSignformDetailInfo_CG: 20023,
          EC_FetchSignformDetailInfoDetail_GC: 20024,
          EC_FetchAllValidContestInfo_CG: 20025,
          EC_FetchAllValidContestInfoResult_GC: 20026,
          EC_FetchContestDetailInfo_CG: 20027,
          EC_FetchContestDetailInfoResult_GC: 20028,
          EC_EnrollContest_CG: 20029,
          EC_EnrollContest_GC: 20030,
          EC_FetchAllClientEnrollUser_CG: 20031,
          EC_FetchAllClientEnrollUserResult_GC: 20032,
          EC_FetchUserMatchRecords_CG: 20033,
          EC_FetchUserMatchRecordsResult_GC: 20034,
          EC_UserDrawMatch_CG: 20035,
          EC_UserDrawMatchResult_GC: 20036,
          EC_UserCreateABallGame_CG: 20037,
          EC_UserCreateABallGameResult_GC: 20038,
          EC_FetchAboutBallGames_CG: 20039,
          EC_FetchUserAboutBallGamesResult_GC: 20040,
          EC_JoinAboutBallGame_CG: 20041,
          EC_JoinAboutBallGameResult_GC: 20042,
          EC_UserKickBallGame_CG: 20043,
          EC_UserKickBallGameResult_GC: 20044,
          EC_UserPostGameResult_CG: 20045,
          EC_UserPostGameResult_GC: 20046,
          EC_BallRankRequest_CG: 20047,
          EC_BallRankResult_GC: 20048,
          EC_FetchBallGameRooms_CG: 20049,
          EC_FetchBallGameRoomsResult_GC: 20050,
          EC_AdminLogin_CG: 20051,
          EC_AdminLoginResult_GC: 20052,
          EC_PostUserMatchNext_CG: 20053,
          EC_PostUserMatchNextResult_CG: 20054
        }
      },
      HeartCheck_GC: {
        fields: {}
      },
      ErrorResult: {
        fields: {
          errCode: {
            type: "int32",
            id: 1
          },
          errMsg: {
            type: "string",
            id: 3
          }
        }
      },
      MsgNotify_GC: {
        fields: {
          msgType: {
            type: "int32",
            id: 1
          },
          notifyMsg: {
            type: "string",
            id: 2
          }
        }
      },
      WXUserInfo: {
        fields: {
          AvatarUrl: {
            type: "string",
            id: 1
          },
          City: {
            type: "string",
            id: 2
          },
          Country: {
            type: "string",
            id: 3
          },
          Gender: {
            type: "int32",
            id: 4
          },
          NickName: {
            type: "string",
            id: 5
          },
          Province: {
            type: "string",
            id: 6
          },
          OpenId: {
            type: "string",
            id: 7
          },
          SessionKey: {
            type: "string",
            id: 8
          },
          Token: {
            type: "string",
            id: 9
          },
          Phone: {
            type: "string",
            id: 10
          },
          Age: {
            type: "int32",
            id: 11
          },
          UserLevel: {
            type: "int32",
            id: 12
          },
          UID: {
            type: "uint32",
            id: 13
          },
          Address: {
            type: "string",
            id: 14
          },
          UserName: {
            type: "string",
            id: 15
          },
          OftenRoom: {
            type: "string",
            id: 16
          }
        }
      },
      WXLoginRegister_CG: {
        fields: {
          registerUser: {
            type: "WXUserInfo",
            id: 1
          }
        }
      },
      WXLoginByOpenID_CG: {
        fields: {
          OpenId: {
            type: "string",
            id: 1
          },
          SessionKey: {
            type: "string",
            id: 2
          }
        }
      },
      WXSession_GC: {
        fields: {
          status: {
            type: "int32",
            id: 1
          },
          info: {
            type: "WXUserInfo",
            id: 2
          }
        }
      },
      UserAddInfo_CG: {
        fields: {
          uuid: {
            type: "uint32",
            id: 1
          }
        }
      },
      UserAddInfo_GC: {
        fields: {
          level: {
            type: "int32",
            id: 1
          },
          bills: {
            type: "int32",
            id: 2
          },
          createBallGames: {
            type: "int32",
            id: 3
          },
          joinBallGames: {
            type: "int32",
            id: 4
          },
          winCreate: {
            type: "int32",
            id: 5
          },
          winJoin: {
            type: "int32",
            id: 6
          }
        }
      },
      WXPhoneDataDecodeBind_CG: {
        fields: {
          SessionKey: {
            type: "string",
            id: 1
          },
          Data: {
            type: "string",
            id: 2
          },
          IV: {
            type: "string",
            id: 3
          },
          Code: {
            type: "int32",
            id: 4
          }
        }
      },
      WXPhoneDataDecodeBindResult_GC: {
        fields: {
          bindStatus: {
            type: "bool",
            id: 1
          },
          phoneNumber: {
            type: "string",
            id: 2
          }
        }
      },
      WXUserInfoSet_CG: {
        fields: {
          UID: {
            type: "uint32",
            id: 1
          },
          Address: {
            type: "string",
            id: 2
          },
          Age: {
            type: "int32",
            id: 3
          },
          UserName: {
            type: "string",
            id: 4
          },
          oftenRoom: {
            type: "string",
            id: 5
          },
          Phone: {
            type: "string",
            id: 6
          }
        }
      },
      WXUserInfoSetResult_GC: {
        fields: {
          Status: {
            type: "bool",
            id: 1
          }
        }
      },
      MapStoreInfo: {
        fields: {
          id: {
            type: "int32",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          facilities: {
            type: "string",
            id: 3
          },
          longitude: {
            type: "float",
            id: 4
          },
          latitude: {
            type: "float",
            id: 5
          },
          chargingRules: {
            type: "string",
            id: 6
          },
          province: {
            type: "string",
            id: 7
          },
          city: {
            type: "string",
            id: 8
          },
          area: {
            type: "string",
            id: 9
          },
          address: {
            type: "string",
            id: 10
          },
          activity: {
            type: "string",
            id: 11
          },
          imgOne: {
            type: "string",
            id: 12
          },
          imgTwo: {
            type: "string",
            id: 13
          },
          imgThree: {
            type: "string",
            id: 14
          },
          imgFour: {
            type: "string",
            id: 15
          },
          imgFive: {
            type: "string",
            id: 16
          },
          imgSix: {
            type: "string",
            id: 17
          },
          version: {
            type: "int32",
            id: 18
          },
          delFlag: {
            type: "int32",
            id: 19
          },
          createBy: {
            type: "string",
            id: 20
          },
          createDate: {
            type: "string",
            id: 21
          },
          updateBy: {
            type: "string",
            id: 22
          },
          updateDate: {
            type: "string",
            id: 23
          },
          uid: {
            type: "string",
            id: 24
          }
        }
      },
      ClientMapStoreInfo: {
        fields: {
          id: {
            type: "int32",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          longitude: {
            type: "float",
            id: 3
          },
          latitude: {
            type: "float",
            id: 4
          }
        }
      },
      FetchMapStoreName_CG: {
        fields: {}
      },
      MapStoreNameResult_GC: {
        fields: {
          info: {
            rule: "repeated",
            type: "ClientMapStoreInfo",
            id: 1
          },
          version: {
            type: "int32",
            id: 2
          }
        }
      },
      FetchMapStoreDetail_CG: {
        fields: {
          id: {
            type: "int32",
            id: 1
          }
        }
      },
      MapStoreDetailInfo_GC: {
        fields: {
          info: {
            type: "MapStoreInfo",
            id: 1
          }
        }
      },
      FtechMapStoreUpdate_CG: {
        fields: {
          version: {
            type: "int32",
            id: 1
          }
        }
      },
      MapStoreUpdate_GC: {
        fields: {
          updates: {
            rule: "repeated",
            type: "ClientMapStoreInfo",
            id: 1
          },
          newadds: {
            rule: "repeated",
            type: "ClientMapStoreInfo",
            id: 2
          },
          deletes: {
            rule: "repeated",
            type: "ClientMapStoreInfo",
            id: 3
          },
          version: {
            type: "int32",
            id: 4
          },
          time: {
            type: "int32",
            id: 5
          }
        }
      },
      AnnouncementInfo: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          context: {
            type: "string",
            id: 3
          },
          imgurl: {
            type: "string",
            id: 4
          },
          type: {
            type: "int32",
            id: 5
          },
          readnumber: {
            type: "int32",
            id: 6
          },
          praisenumber: {
            type: "int32",
            id: 7
          },
          showflag: {
            type: "int32",
            id: 8
          },
          delflag: {
            type: "int32",
            id: 9
          },
          createBy: {
            type: "string",
            id: 10
          },
          updateBy: {
            type: "string",
            id: 11
          },
          createTime: {
            type: "int32",
            id: 12
          }
        }
      },
      ClientAnnouncementInfo: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          imgurl: {
            type: "string",
            id: 3
          },
          readnumber: {
            type: "int32",
            id: 4
          },
          praisenumber: {
            type: "int32",
            id: 5
          }
        }
      },
      FetchAnnouncementDetailInfo_CG: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          }
        }
      },
      FetchAnnouncementDetailInfoResult_GC: {
        fields: {
          info: {
            type: "AnnouncementInfo",
            id: 1
          }
        }
      },
      FetchAnnouncementInfos_CG: {
        fields: {
          currentpage: {
            type: "int32",
            id: 1
          }
        }
      },
      AnnouncementInfos_GC: {
        fields: {
          currentpage: {
            type: "int32",
            id: 1
          },
          info: {
            rule: "repeated",
            type: "ClientAnnouncementInfo",
            id: 2
          }
        }
      },
      SignformDetailInfo: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          context: {
            type: "string",
            id: 3
          },
          imgurl: {
            type: "string",
            id: 4
          },
          showflag: {
            type: "int32",
            id: 5
          },
          delflag: {
            type: "int32",
            id: 6
          },
          createby: {
            type: "string",
            id: 7
          },
          updateby: {
            type: "string",
            id: 8
          },
          imgone: {
            type: "string",
            id: 9
          },
          imgtwo: {
            type: "string",
            id: 10
          },
          imgthree: {
            type: "string",
            id: 11
          },
          imgfour: {
            type: "string",
            id: 12
          },
          createTime: {
            type: "int32",
            id: 13
          }
        }
      },
      ClientSignform: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          imgurl: {
            type: "string",
            id: 3
          }
        }
      },
      FetchAllClientSignforms_CG: {
        fields: {
          currentpage: {
            type: "int32",
            id: 1
          }
        }
      },
      FetchAllClientSignformsResult_GC: {
        fields: {
          currentpage: {
            type: "int32",
            id: 1
          },
          info: {
            rule: "repeated",
            type: "ClientSignform",
            id: 2
          }
        }
      },
      FetchSignformDetailInfo_CG: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          }
        }
      },
      FetchSignformDetailInfoDetail_GC: {
        fields: {
          info: {
            type: "SignformDetailInfo",
            id: 1
          }
        }
      },
      ContestDetailInfo: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          text: {
            type: "string",
            id: 3
          },
          imgurl: {
            type: "string",
            id: 4
          },
          peopleNumber: {
            type: "int32",
            id: 5
          },
          money: {
            type: "int32",
            id: 6
          },
          state: {
            type: "int32",
            id: 7
          },
          fabulousNumber: {
            type: "int32",
            id: 8
          },
          province: {
            type: "string",
            id: 9
          },
          city: {
            type: "string",
            id: 10
          },
          area: {
            type: "string",
            id: 11
          },
          address: {
            type: "string",
            id: 12
          },
          playRoom: {
            type: "string",
            id: 14
          },
          showflag: {
            type: "int32",
            id: 15
          },
          delflag: {
            type: "int32",
            id: 16
          },
          enrollMoney: {
            type: "int32",
            id: 17
          },
          playDays: {
            type: "int32",
            id: 18
          },
          playStartTime: {
            type: "string",
            id: 19
          },
          playEndTime: {
            type: "string",
            id: 20
          },
          playTime: {
            type: "string",
            id: 13
          },
          drawLotsTime: {
            type: "string",
            id: 21
          }
        }
      },
      ClientContestInfo: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          imgurl: {
            type: "string",
            id: 3
          },
          enrollMoney: {
            type: "int32",
            id: 4
          },
          state: {
            type: "int32",
            id: 5
          },
          address: {
            type: "string",
            id: 6
          },
          playDays: {
            type: "int32",
            id: 7
          },
          peopleNumber: {
            type: "int32",
            id: 8
          },
          money: {
            type: "int32",
            id: 9
          },
          playTimeStart: {
            type: "string",
            id: 10
          },
          playTimeStop: {
            type: "string",
            id: 11
          },
          penpleCount: {
            type: "int32",
            id: 12
          }
        }
      },
      FetchAllValidContestInfo_CG: {
        fields: {
          currentpage: {
            type: "int32",
            id: 1
          }
        }
      },
      FetchAllValidContestInfoResult_GC: {
        fields: {
          currentpage: {
            type: "int32",
            id: 1
          },
          info: {
            rule: "repeated",
            type: "ClientContestInfo",
            id: 2
          }
        }
      },
      FetchContestDetailInfo_CG: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          }
        }
      },
      FetchContestDetailInfoResult_GC: {
        fields: {
          info: {
            type: "ContestDetailInfo",
            id: 1
          }
        }
      },
      EnrollUserDetailInfo: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          },
          uuid: {
            type: "uint32",
            id: 2
          },
          contestId: {
            type: "uint32",
            id: 3
          },
          userName: {
            type: "string",
            id: 4
          },
          userPhone: {
            type: "string",
            id: 5
          },
          drawResult: {
            type: "int32",
            id: 6
          },
          canDraw: {
            type: "bool",
            id: 7
          },
          billMoney: {
            type: "int32",
            id: 8
          },
          ranking: {
            type: "string",
            id: 9
          },
          money: {
            type: "int32",
            id: 10
          },
          createTime: {
            type: "string",
            id: 11
          },
          maxPostIndex: {
            type: "int32",
            id: 12
          }
        }
      },
      ClientEnrollUserInfo: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          },
          drawResult: {
            type: "int32",
            id: 2
          },
          userName: {
            type: "string",
            id: 3
          },
          createTime: {
            type: "string",
            id: 4
          },
          uuid: {
            type: "uint32",
            id: 5
          },
          maxPostIndex: {
            type: "int32",
            id: 6
          }
        }
      },
      EnrollContest_CG: {
        fields: {
          billMoney: {
            type: "int32",
            id: 1
          },
          contestId: {
            type: "uint32",
            id: 2
          },
          uuid: {
            type: "uint32",
            id: 3
          },
          note: {
            type: "string",
            id: 4
          }
        }
      },
      EnrollContest_GC: {
        fields: {
          errCode: {
            type: "int32",
            id: 1
          },
          appId: {
            type: "string",
            id: 2
          },
          nonceStr: {
            type: "string",
            id: 3
          },
          "package": {
            type: "string",
            id: 4
          },
          signType: {
            type: "string",
            id: 5
          },
          timeStamp: {
            type: "string",
            id: 6
          },
          paySign: {
            type: "string",
            id: 7
          },
          errString: {
            type: "string",
            id: 8
          }
        }
      },
      CourceDetailInfo: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          context: {
            type: "string",
            id: 3
          },
          videourl: {
            type: "string",
            id: 4
          },
          imgurl: {
            type: "string",
            id: 5
          },
          author: {
            type: "string",
            id: 6
          },
          showflag: {
            type: "int32",
            id: 7
          },
          delflag: {
            type: "int32",
            id: 8
          }
        }
      },
      FetchAllClientEnrollUser_CG: {
        fields: {
          contestId: {
            type: "uint32",
            id: 1
          }
        }
      },
      FetchAllClientEnrollUserResult_GC: {
        fields: {
          info: {
            rule: "repeated",
            type: "ClientEnrollUserInfo",
            id: 1
          }
        }
      },
      UserMatchRecords: {
        fields: {
          title: {
            type: "string",
            id: 1
          },
          address: {
            type: "string",
            id: 2
          },
          ranking: {
            type: "string",
            id: 3
          },
          money: {
            type: "int32",
            id: 4
          },
          imgUrl: {
            type: "string",
            id: 5
          },
          contestId: {
            type: "uint32",
            id: 6
          },
          billMoney: {
            type: "int32",
            id: 7
          }
        }
      },
      FetchUserMatchRecords_CG: {
        fields: {
          uuid: {
            type: "uint32",
            id: 1
          }
        }
      },
      FetchUserMatchRecordsResult_GC: {
        fields: {
          info: {
            rule: "repeated",
            type: "UserMatchRecords",
            id: 1
          }
        }
      },
      UserDrawMatch_CG: {
        fields: {
          contestId: {
            type: "uint32",
            id: 1
          }
        }
      },
      UserDrawMatchResult_GC: {
        fields: {
          resultCode: {
            type: "int32",
            id: 1
          },
          resultData: {
            type: "string",
            id: 2
          }
        }
      },
      AboutBallGameLevel: {
        values: {
          Invalid: 0,
          NormalLevel: 1,
          DiamondLevel: 2
        }
      },
      AboutBallContent: {
        fields: {
          ballId: {
            type: "string",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          context: {
            type: "string",
            id: 3
          },
          timePlay: {
            type: "int32",
            id: 4
          },
          roomId: {
            type: "int32",
            id: 5
          },
          roomPlayAddress: {
            type: "string",
            id: 6
          },
          playRound: {
            type: "int32",
            id: 7
          },
          level: {
            type: "AboutBallGameLevel",
            id: 8
          },
          createUID: {
            type: "uint32",
            id: 9
          },
          createUserName: {
            type: "string",
            id: 10
          },
          createUserPhone: {
            type: "string",
            id: 11
          },
          joinUID: {
            type: "uint32",
            id: 12
          },
          joinUserName: {
            type: "string",
            id: 13
          },
          joinUserPhone: {
            type: "string",
            id: 14
          },
          status: {
            type: "int32",
            id: 15
          },
          imgOne: {
            type: "string",
            id: 16
          },
          difen: {
            type: "int32",
            id: 17
          }
        }
      },
      EndAboutBallContent: {
        fields: {
          info: {
            type: "AboutBallContent",
            id: 1
          },
          winId: {
            type: "uint32",
            id: 2
          },
          firstPostId: {
            type: "uint32",
            id: 3
          },
          secondPostId: {
            type: "uint32",
            id: 4
          },
          firstPostTime: {
            type: "uint32",
            id: 5
          },
          secondPostTime: {
            type: "uint32",
            id: 6
          },
          bTimeAutoPost: {
            type: "bool",
            id: 7
          },
          bill: {
            type: "int32",
            id: 8
          }
        }
      },
      UserCreateABallGame_CG: {
        fields: {
          title: {
            type: "string",
            id: 1
          },
          context: {
            type: "string",
            id: 2
          },
          timePlay: {
            type: "int32",
            id: 3
          },
          roomId: {
            type: "int32",
            id: 4
          },
          roomPlayAddress: {
            type: "string",
            id: 5
          },
          playRound: {
            type: "int32",
            id: 6
          },
          level: {
            type: "AboutBallGameLevel",
            id: 7
          },
          createUserName: {
            type: "string",
            id: 8
          },
          createUserPhone: {
            type: "string",
            id: 9
          },
          difen: {
            type: "int32",
            id: 10
          }
        }
      },
      UserCreateABallGameResult_GC: {
        fields: {
          ballGameId: {
            type: "string",
            id: 1
          }
        }
      },
      FetchAboutBallGames_CG: {
        fields: {
          status: {
            type: "int32",
            id: 1
          },
          page: {
            type: "int32",
            id: 2
          },
          pageNum: {
            type: "int32",
            id: 3
          },
          roomId: {
            type: "int32",
            id: 4
          }
        }
      },
      FetchUserAboutBallGamesResult_GC: {
        fields: {
          info: {
            rule: "repeated",
            type: "AboutBallContent",
            id: 1
          },
          endInfo: {
            rule: "repeated",
            type: "EndAboutBallContent",
            id: 2
          },
          status: {
            type: "int32",
            id: 3
          }
        }
      },
      JoinAboutBallGame_CG: {
        fields: {
          ballId: {
            type: "string",
            id: 1
          },
          joinUserName: {
            type: "string",
            id: 2
          },
          joinUserPhone: {
            type: "string",
            id: 3
          }
        }
      },
      JoinAboutBallGameResult_GC: {
        fields: {
          ballGameId: {
            type: "string",
            id: 1
          }
        }
      },
      UserKickBallGame_CG: {
        fields: {
          ballGameId: {
            type: "string",
            id: 1
          },
          deleteGame: {
            type: "bool",
            id: 2
          }
        }
      },
      UserKickBallGameResult_GC: {
        fields: {
          ballGameId: {
            type: "string",
            id: 1
          }
        }
      },
      UserPostGameResult_CG: {
        fields: {
          ballGameId: {
            type: "string",
            id: 1
          },
          winId: {
            type: "uint32",
            id: 2
          }
        }
      },
      UserPostGameResult_GC: {
        fields: {
          ballGameId: {
            type: "string",
            id: 1
          }
        }
      },
      BallRankRequest_CG: {
        fields: {}
      },
      BallRank: {
        fields: {
          uuid: {
            type: "uint32",
            id: 1
          },
          nickName: {
            type: "string",
            id: 2
          },
          bill: {
            type: "int32",
            id: 3
          },
          headurl: {
            type: "string",
            id: 4
          }
        }
      },
      BallRankResult_GC: {
        fields: {
          info: {
            rule: "repeated",
            type: "BallRank",
            id: 1
          }
        }
      },
      FetchBallGameRooms_CG: {
        fields: {}
      },
      FetchBallGameRoomsResult_GC: {
        fields: {
          RoomId: {
            rule: "repeated",
            type: "int32",
            id: 1
          }
        }
      },
      AdminLogin_CG: {
        fields: {
          user: {
            type: "string",
            id: 1
          },
          passworld: {
            type: "string",
            id: 2
          },
          vertiCode: {
            type: "string",
            id: 3
          }
        }
      },
      AdminLoginResult_GC: {
        fields: {
          errCode: {
            type: "int32",
            id: 1
          },
          errMsg: {
            type: "string",
            id: 2
          },
          name: {
            type: "string",
            id: 3
          },
          level: {
            type: "int32",
            id: 4
          },
          phone: {
            type: "string",
            id: 5
          },
          account: {
            type: "string",
            id: 6
          },
          loginTime: {
            type: "int32",
            id: 7
          }
        }
      },
      PostUserMatchNext_CG: {
        fields: {
          firstUUID: {
            type: "uint32",
            id: 1
          },
          secondUUID: {
            type: "uint32",
            id: 2
          },
          winUUID: {
            type: "uint32",
            id: 3
          },
          contestId: {
            type: "uint32",
            id: 4
          }
        }
      },
      PostUserMatchNextResult_CG: {
        fields: {
          errCode: {
            type: "int32",
            id: 1
          },
          errMsg: {
            type: "string",
            id: 2
          }
        }
      }
    }
  }
});

module.exports = $root;
