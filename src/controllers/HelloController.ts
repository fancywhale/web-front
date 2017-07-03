import {Get, Res, RestController, Inject, QueryParam} from "loon";
import {HelloService} from '../services/HelloService';
import * as Express from 'express';

@RestController("/")
export class HealthcheckController {

    @Inject()
    private helloService: HelloService;

    @Get("")
    @Get("/home")  
    public async indexAction(@QueryParam('q') q: string, @Res() res: Express.Response) {
      const result = this.helloService.echo(q);
      res.render('home/index', { title: 'Hey', message: 'Hello there!' })
    }

}
