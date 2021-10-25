import { ApiTablePage } from 'typings/components/tablepage'
import { CustomerItem } from 'typings/page/customer'
import { GetFieldType } from 'typings/utils'
import APIFetch from 'utils/fetch'

// 获取当前账户的下级客服 (含当前用户)
export const subordinateCustomer = () =>
	APIFetch<ApiTablePage<CustomerItem>>({
		url: '/product.employ.list',
		method: 'get',
		storePath: {
			list: {
				path: 'customer.subordinate',
				handler: (val) => val,
			},
		},
		dataPath: 'data.data',
	})
