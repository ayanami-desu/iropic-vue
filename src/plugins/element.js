import Vue from 'vue'
//import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//Vue.use(Element)
import {
  Pagination,
  Dialog,
  Drawer,
  Input,
  Select,
  Option,
  Button,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tag,
  Icon,
  Upload,
  Badge,
  Divider,
  Image,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Drawer)
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tag);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(Badge);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
