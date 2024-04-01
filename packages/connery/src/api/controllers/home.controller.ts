import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../auth.guard.js';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { PluginService } from '../services/plugin.service.js';

@Controller('/')
export class HomeController {
  constructor(private pluginService: PluginService) {}

  @Public()
  @ApiExcludeEndpoint()
  @Get()
  getHomePage(@Res() res: Response) {
    const pluginTitle = this.pluginService.plugin.title;
    const pluginDescription = this.pluginService.plugin.description;
    const listOfActions = this.pluginService.plugin.actions
      .map((action) => '<span class="italic">' + action.title + '</span>')
      .join(', ');

    const htmlContent = `
      <html>
        <head>
          <title>${pluginTitle} - ${pluginDescription}</title>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="flex items-center justify-center min-h-screen">
          <div class="mx-auto max-w-3xl px-4">
            <main class="my-10 grid items-center justify-center gap-4 text-center md:gap-10 lg:gap-16">
              <div class="space-y-4">
                <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">✨<br />${pluginTitle}</h1>
                <p class="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ${pluginDescription}
                </p>
              </div>
              <section class="grid gap-8 md:gap-16">
                <div class="space-y-4">
                  <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl">Available actions</h2>
                  <p class="text-gray-500">This <a class="underline" href="#">plugin</a> contains the following <a class="underline" href="#">actions</a>:<br/> ${listOfActions}</p>
                  <div class="flex justify-center gap-4">
                  <a
                    class="inline-flex items-center justify-center h-10 px-4 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-900 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                    href="https://sdk.connery.io"
                    target="_blank"
                  >
                    Learn how to use the plugin and its actions
                  </a>
                </div>
                </div>
                <div class="space-y-4">
                  <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl">Plugin API</h2>
                  <p class="text-gray-500">Explore the API to use the plugin and its actions from your application.</p>
                  <div class="flex justify-center gap-4">
                    <a
                      class="inline-flex items-center justify-center h-10 px-4 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-900 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                      href="/api"
                    >
                      Interactive OpenAPI Docs
                    </a>
                  </div>
                </div>
                <div class="space-y-4">
                  <h2 class="text-2xl font-bold tracking-tighter sm:text-3xl">Built using Connery SDK</h2>
                  <p class="text-gray-500">
                    This plugin is built using <a class="underline" href="https://github.com/connery-io/connery" target="_blank">Connery SDK</a>,<br/>the open-source SDK for AI plugins and actions development.
                  </p>
                </div>
              </section>
            </main>
          </div>
        </body>
      </html>
    `;

    res.send(htmlContent);
  }
}
