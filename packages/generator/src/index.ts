import { compile } from '@openapi-client/compiler-typescript'
import { transform } from '@openapi-client/transformer'
import del from 'del'
import fs from 'fs'
import { mkdirSync } from 'mkdir-recursive'
import { OpenAPIV3 } from 'openapi-types'
import path from 'path'

export interface Options {
	outDir: string
}

export function generateClient(spec: OpenAPIV3.Document, options: Options): any {
	const result = compile(transform(spec))
	if (options.outDir) {
		del.sync([options.outDir])
		for (const item of result) {
			const targetPath = options.outDir + '/' + item.path
			mkdirSync(path.dirname(targetPath))
			fs.writeFileSync(targetPath, item.data, { flag: 'w' })
		}
	}
	return result
}
