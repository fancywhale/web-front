import {ApplicationLoader, ApplicationSettings} from "loon";

@ApplicationSettings({
  rootDir: `${__dirname}/../`,
  port: 9001,
  publicDir: `${__dirname}/../public`
})
export class Application extends ApplicationLoader {
}
