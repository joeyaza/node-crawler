import {Provide} from "@onscroll/di-ts";
import {Http} from "@onscroll/http-client-ts";
import {SpyOn} from "@onscroll/spy-provider";
import * as Promise from "bluebird";


@Provide(Http)
export class HttpMock extends Http {

    public static response: any;
    public static shouldReject: boolean;

    @SpyOn
    public get(option: any) {

        if (HttpMock.shouldReject) {

            return Promise.reject(new Error("error"));

        }

        return Promise.resolve(HttpMock.response);

    }


}
