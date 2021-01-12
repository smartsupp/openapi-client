import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Notifications = SmartsuppCoreApi.Notifications

export class NotificationsClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	dashboardGet(options?): Promise<SmartsuppCoreApi.NotificationsDashboard> {
		return this.adapter.request('get', `/notifications`, null, null, options)
	}
	dashboardUpdate(body: Notifications.DashboardUpdateBody, options?): Promise<SmartsuppCoreApi.NotificationsDashboard> {
		return this.adapter.request('patch', `/notifications`, body, null, options)
	}
	mobileGet(options?): Promise<SmartsuppCoreApi.NotificationsMobile> {
		return this.adapter.request('get', `/notifications/mobile`, null, null, options)
	}
	mobileUpdate(body: Notifications.MobileUpdateBody, options?): Promise<SmartsuppCoreApi.NotificationsMobile> {
		return this.adapter.request('patch', `/notifications/mobile`, body, null, options)
	}
}
