const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({json: true}));

const notes = [{
    "id": 0,
    "content": "То, что было введно в поле ввода"
},
{
    "id": 1,
    "content": "То, что было введно в поле ввода 1"
},
{
    "id": 2,
    "content": "То, что было введно в поле ввода 2"
},
{
    "id": 3,
    "content": "То, что было введно в поле ввода 3"
},
{
    "id": 4,
    "content": "То, что было введно в поле ввода 4"
}
];
let nextId = notes.length;

const router = new Router();

router.get('/notes', async (ctx, next) => {
    ctx.response.body = notes;
console.log("Get Notes :",notes);
});

router.post('/notes', async(ctx, next) => {
    notes.push({...ctx.request.body, id: nextId++});
    ctx.response.status = 204;
console.log("Add note ");
});

router.delete('/notes/:id', async(ctx, next) => {
    const noteId = Number(ctx.params.id);
    console.log("Delete, noteId : ",noteId);


    const index = notes.findIndex(o => o.id === noteId);
    if (index !== -1) {
        notes.splice(index, 1);
    console.log("Deleted :",ctx.params.id,"notes :",notes);
    }
    ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started'));
