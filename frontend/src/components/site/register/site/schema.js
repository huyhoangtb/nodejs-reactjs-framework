import React from 'react';
import {t1} from 'i18n';
import {Col, Input} from 'antd';
import {fetchNode} from 'common';
import Validators from 'common/validate';
import SelectElement from 'schema-form/elements/Select';

export const layout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 24},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 24},
  },
};

export default ($this => {
  const {searchOrg, SAAS_DOMAIN} = $this.props;
  return [
    {
      label: 'saasDomains',
      name: 'saasDomains',
      colSpan: 18,
      component: SelectElement,
      decoratorOption: {rules: [{required: true, message: 'saasDomains is required'}]},
      componentProps: {
        mode: 'tags',
        placeholder: `You enter subdomain, and after init success, you can user subdomain.${SAAS_DOMAIN}`,
        filterOption: false,
      },
    },
    {
      component: (props => <Col span={6}>
        <div className='ant-row' style={{lineHeight: '75px'}}> {props.children}</div>
      </Col>),
      componentProps: {
        children: `.${SAAS_DOMAIN}`
      },
    },
    {
      label: 'domains',
      name: 'domains',
      colSpan: 24,
      component: SelectElement,
      componentProps: {
        mode: 'tags',
        placeholder: 'Enter your domains. For example your-company.com or service.your-company.com',
        filterOption: false,
      },
    },

    {
      label: t1('site title'),
      name: 'title',
      colSpan: 24,
      component: Input,
      componentProps: {
        placeholder: t1('site title'),
      }
    },
    {
      label: t1('keyword'),
      name: 'keyword',
      colSpan: 24,
      component: Input.TextArea,
      componentProps: {
        placeholder: t1('Keyword using to let google what do you want they see. for example: website, we sell a production'),
      }
    },
    {
      label: t1('description'),
      name: 'description',
      colSpan: 24,
      component: Input.TextArea,
      componentProps: {
        placeholder: t1('description will using to display for user to read before they click to go to your site'),
      }
    },
  ];
});
