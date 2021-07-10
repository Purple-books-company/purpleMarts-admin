import {
  Card,
  ContainerColumn,
  ContainerRow,
  MarginAround,
} from '../../styles/styled';

import { Link } from 'react-router-dom';
import { ColorOne, ColorTwo } from '../../styles/color';

function AssetComponents({ catCount, supCount }) {
  return (
    <>
      <ContainerRow dynamic>
        <ContainerColumn height='100%' className='col-md-3 col-sm-6 col-xs-6'>
          <Card single>
            <MarginAround>
              <Link
                to='/post'
                style={{ textDecoration: 'none', color: ColorTwo }}
              >
                <i
                  class='fa fa-database mr-2'
                  style={{ color: ColorOne }}
                  aria-hidden='true'
                ></i>
                New
              </Link>
            </MarginAround>
          </Card>
        </ContainerColumn>
        <ContainerColumn height='100%' className='col-md-3 col-sm-6 col-xs-6'>
          <Card single nohover>
            <MarginAround>
              <i
                class='fa fa-cubes mr-2'
                style={{ color: ColorOne }}
                aria-hidden='true'
              ></i>

              <span style={{ textDecoration: 'none', color: ColorOne }}>
                Category-<b>{catCount}</b>
              </span>
            </MarginAround>
          </Card>
        </ContainerColumn>
        <ContainerColumn height='100%' className='col-md-3 col-sm-6 col-xs-6'>
          <Card single nohover>
            <MarginAround>
              <i
                class='fa fa-users mr-2'
                style={{ color: ColorOne }}
                aria-hidden='true'
              ></i>

              <span style={{ textDecoration: 'none', color: ColorOne }}>
                Suppliers-<b>{supCount}</b>
              </span>
            </MarginAround>
          </Card>
        </ContainerColumn>
        <ContainerColumn height='100%' className='col-md-3 col-sm-6 col-xs-6'>
          <Card single nohover>
            <MarginAround>
              <i
                class='fa fa-tags mr-2'
                style={{ color: ColorOne }}
                aria-hidden='true'
              ></i>

              <span style={{ textDecoration: 'none', color: ColorOne }}>
                products-<b>4</b>
              </span>
            </MarginAround>
          </Card>
        </ContainerColumn>
      </ContainerRow>
    </>
  );
}
export default AssetComponents;
