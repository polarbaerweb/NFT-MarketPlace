import { deleteAsync } from 'del';

export const deleteFiles = ()=> {
	return deleteAsync(app.path.clean)
}