import { op } from '../models/BaseModel';
import appConfig from '../models/mertrack/AppConfig';
import MstMenu from '../models/mertrack/MstMenu';
import MstSectionRole from '../models/mertrack/MstSectionRole';
import MstUser from '../models/mertrack/MstUser';
import { getMstMenu } from '../service/MstMenu';
import { getMstSectionRole } from '../service/MstSectionRole';
import { getMstUser } from '../service/MstUser';

export const syncAppConfig = async () => {
  let getData = await appConfig.findOne({ where: { id: 1 } });
  if (!getData) {
    await appConfig.create(initConfig());
    getData = await appConfig.findOne({ where: { id: 1 } });
  }
  return getData;
};

export const syncMstUser = async () => {
  try {
    let data = await getMstUser();
    if (data && !data.error) {
      await MstUser.delete({ where: { id: { [op.ne]: null } } });
      for (const it of data.data) await MstUser.create(it);
    }
  } catch (error) {
    console.log(error);
  }
};

export const syncMstMenu = async () => {
  try {
    let data = await getMstMenu();
    if (data && !data.error) {
      await MstMenu.delete({ where: { id: { [op.ne]: null } } });
      for (const it of data.data) await MstMenu.create(it);
    }
  } catch (error) {
    console.log(error);
  }
};

export const syncMstSectionRole = async () => {
  try {
    let data = await getMstSectionRole();
    if (data && !data.error) {
      await MstSectionRole.delete({ where: { id: { [op.ne]: null } } });
      for (const it of data.data) {
        let param = {
          id: it.role_id,
          mst_menu_id: it.mst_menu_id,
          mst_section_id: it.section_id,
          access: it?.can_edit == 'true' ? 1 : 0,
          approve: it?.can_approve == 'true' ? 1 : 0,
        };
        await MstSectionRole.create(param);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
