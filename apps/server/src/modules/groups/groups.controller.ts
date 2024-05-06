import { Hono } from 'hono';
import { GroupsService } from './groups.service';
import { zValidator } from '@hono/zod-validator';
import { createGroupDto } from './dto/create-group.dto';

export const router = new Hono();

router
  .get('/', async (c) => {
    const groups = await GroupsService.getAll();

    return c.json({
      data: groups,
      status: 200,
    });
  })
  .post('/', zValidator("json", createGroupDto), async (c) => {
    const createGroup = await c.req.json();
    const group = await GroupsService.create(createGroup);

    return c.json({ data: group, status: 201 });
  });
