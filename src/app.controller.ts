import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger'
import * as si from 'systeminformation'
import { Systeminformation } from 'systeminformation'
import { AuthGuard } from './auth.guard'
import { Example } from './example'
import { TokenService } from './token.service'

@Controller()
@ApiQuery({ name: 'token', description: 'Auth token, get this from console log', required: true })
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('/token')
  updateToken(@Query('newToken') newToken: string) {
    this.tokenService.updateToken(newToken)
    return { msg: 'ok' }
  }

  @Get('/os')
  @ApiOperation({ tags: ['OS'], externalDocs: { url: 'https://systeminformation.io/os.html', description: 'View systeminformation os section for more details' } })
  @ApiResponse({ example: Example.os })
  osInfo(): Promise<Systeminformation.OsData> {
    return si.osInfo()
  }

  @ApiResponse({ example: Example.statsBasic })
  @ApiOperation({ summary: 'Get basic system stats: memory, CPU load, and network stats' })
  @Get('/stats/basic')
  async stats() {
    return si.get({
      mem: '*',
      currentLoad:
        'avgLoad,currentLoad,currentLoadUser,currentLoadIdle,currentLoadSystem',
      networkStats: '*',
    })
  }

  @ApiOperation({ tags: ['OS'], externalDocs: { url: 'https://systeminformation.io/os.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.versions })
  @Get('/versions')
  versions() {
    return si.versions()
  }

  @ApiOperation({ tags: ['Memory'], externalDocs: { url: 'https://systeminformation.io/os.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.mem })
  @Get('/mem')
  mem() {
    return si.mem()
  }

  @ApiOperation({ tags: ['CPU'], externalDocs: { url: 'https://systeminformation.io/cpu.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.cpu })
  @Get('/cpu')
  cpu() {
    return si.cpu()
  }

  /*  @Get('/cpu/temperature')
  cpuTemperature() {
    return si.cpuTemperature()
  } */
  @ApiOperation({ tags: ['Processes'], externalDocs: { url: 'https://systeminformation.io/processes.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.load })
  @Get('/load')
  currentLoad() {
    return si.currentLoad()
  }

  @ApiOperation({ tags: ['Processes'], externalDocs: { url: 'https://systeminformation.io/processes.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.processes })
  @Get('/processes')
  processes() {
    return si.processes()
  }

  @ApiOperation({ tags: ['Processes'], externalDocs: { url: 'https://systeminformation.io/processes.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.services })
  @ApiQuery({ name: 'name', description: 'Services names', required: true, example: 'mysqld,redis' })
  @Get('/services')
  services(@Query('name') name: string) {
    return si.services(name)
  }

  @ApiOperation({ tags: ['Processes'], externalDocs: { url: 'https://systeminformation.io/processes.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.processLoad })
  @ApiQuery({ name: 'name', description: 'Process names', required: true, example: 'nginx, ssl' })
  @Get('/process/load')
  processLoad(@Query('name') name: string) {
    return si.processLoad(name)
  }

  @ApiOperation({ tags: ['Disks'], externalDocs: { url: 'https://systeminformation.io/filesystem.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.diskIO })
  @Get('/disk/io')
  diskIO() {
    return si.disksIO()
  }

  @ApiOperation({ tags: ['Disks'], externalDocs: { url: 'https://systeminformation.io/filesystem.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.diskLayout })
  @Get('/disk/layout')
  diskLayout() {
    return si.diskLayout()
  }

  @ApiOperation({ tags: ['Disks'], externalDocs: { url: 'https://systeminformation.io/filesystem.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.fsSize })
  @Get('/fs/size')
  fsSize() {
    return si.fsSize()
  }

  @ApiOperation({ tags: ['Disks'], externalDocs: { url: 'https://systeminformation.io/filesystem.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.fsStats })
  @Get('/fs/stats')
  fsStats() {
    return si.fsStats()
  }

  @ApiOperation({ tags: ['Network'], externalDocs: { url: 'https://systeminformation.io/network.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.networkInterfaces })
  @Get('/network/interfaces')
  networkInterfaces() {
    return si.networkInterfaces()
  }

  @ApiOperation({ tags: ['Network'], externalDocs: { url: 'https://systeminformation.io/network.html', description: 'View systeminformation document for more details' } })
  @ApiResponse({ example: Example.networkStats })
  @ApiQuery({ name: 'ifaces', description: 'Network Interface', required: false, example: 'WLAN,Loopback Pseudo-Interface 1', default: '*' })
  @Get('/network/stats')
  networkStats(@Query('ifaces') ifaces?: string) {
    return si.networkStats(ifaces ?? '*')
  }

  // @Get('/network/connections')
  // networkConnections() {
  //   return si.networkConnections()
  // }

  @ApiOperation({ tags: ['Docker'], externalDocs: { url: 'https://systeminformation.io/docker.html', description: 'View systeminformation document for more details' } })
  @Get('/docker/containers')
  dockerContainers() {
    return si.dockerContainers()
  }

  @ApiOperation({ tags: ['Docker'], externalDocs: { url: 'https://systeminformation.io/docker.html', description: 'View systeminformation document for more details' } })
  @Get('/docker/info')
  dockerInfo() {
    return si.dockerInfo()
  }

  @ApiOperation({ tags: ['Docker'], externalDocs: { url: 'https://systeminformation.io/docker.html', description: 'View systeminformation document for more details' } })
  @ApiQuery({ name: 'id', description: 'Container id', required: false, example: 'mysql,redis', default: '*' })
  @Get('/docker/container/status')
  dockerContainerStats(@Query('id') id?: string) {
    return si.dockerContainerStats(id ?? '*')
  }
}
